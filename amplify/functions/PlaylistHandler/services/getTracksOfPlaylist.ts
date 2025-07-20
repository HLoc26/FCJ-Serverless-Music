import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { jsonResponse } from '../../utils/response';
import { env } from '$amplify/env/PlaylistHandler';

const db = new DynamoDB.DocumentClient();

export const getTracksOfPlaylist = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    const playlistId = event.pathParameters?.id;
    if (!playlistId) return jsonResponse(400, { message: 'Missing playlist ID' });

    try {
        const playlistTrackResult = await db.query({
            TableName: env.PLAYLIST_TRACK_TABLE_NAME,
            KeyConditionExpression: 'playlistId = :pid',
            ExpressionAttributeValues: {
                ':pid': playlistId,
            },
        }).promise();

        const trackIds = playlistTrackResult.Items?.map(item => item.trackId) || [];

        if (trackIds.length === 0) {
            return jsonResponse(200, []);
        }

        const batches: string[][] = [];
        for (let i = 0; i < trackIds.length; i += 100) {
            batches.push(trackIds.slice(i, i + 100));
        }

        let tracks: any[] = [];

        for (const batch of batches) {
            const batchResult = await db.batchGet({
                RequestItems: {
                    [env.TRACK_TABLE_NAME]: {
                        Keys: batch.map(id => ({ id })),
                    },
                },
            }).promise();

            tracks = tracks.concat(batchResult.Responses?.[env.TRACK_TABLE_NAME] || []);
        }

        return jsonResponse(200, tracks);
    } catch (error: any) {
        console.error('Error getting tracks of playlist:', error);
        return jsonResponse(500, { message: error.message });
    }
};
