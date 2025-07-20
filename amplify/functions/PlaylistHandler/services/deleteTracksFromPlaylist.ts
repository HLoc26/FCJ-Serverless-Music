import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { jsonResponse } from '../../utils/response';

const dynamoDb = new DynamoDB.DocumentClient();

export const deleteTracksFromPlaylist = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    try {
        const playlistId = event.pathParameters?.playlistId;
        if (!playlistId) {
            return jsonResponse(400, { message: 'Missing playlistId in path' });
        }

        const body = JSON.parse(event.body || '{}');
        const trackIds: string[] = body.trackIds;

        if (!Array.isArray(trackIds) || trackIds.length === 0) {
            return jsonResponse(400, { message: 'trackIds must be a non-empty array' });
        }

        const deleteRequests = trackIds.map((trackId) => ({
            DeleteRequest: {
                Key: {
                    playlistId: playlistId,
                    trackId: trackId,
                },
            },
        }));

        // Batch delete in chunks of 25 (DynamoDB limit per batchWrite)
        const BATCH_SIZE = 25;
        for (let i = 0; i < deleteRequests.length; i += BATCH_SIZE) {
            const batch = deleteRequests.slice(i, i + BATCH_SIZE);

            await dynamoDb
                .batchWrite({
                    RequestItems: {
                        PlaylistTrackTable: batch,
                    },
                })
                .promise();
        }

        return jsonResponse(200, {
            message: 'Tracks deleted from playlist successfully',
            deletedCount: trackIds.length,
        });
    } catch (error: any) {
        console.error('Error deleting tracks from playlist:', error);
        return jsonResponse(500, { message: 'Internal server error' });
    }
};
