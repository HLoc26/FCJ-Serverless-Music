import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { jsonResponse } from '../../utils/response';
import { env } from "$amplify/env/PlaylistHandler"

const db = new DynamoDB.DocumentClient();

export const deletePlaylistTracks = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const userId = event.requestContext.authorizer?.jwt?.claims?.sub;
    if (!userId) return jsonResponse(401, { message: 'Unauthorized' });

    const playlistId = event.pathParameters?.id || event.path.split('/')[2];
    if (!playlistId) return jsonResponse(400, { message: 'Missing playlist ID' });

    // Scan all track items in playlist
    const result = await db.query({
        TableName: process.env.PLAYLIST_TRACK_TABLE!,
        IndexName: 'byPlaylistId',
        KeyConditionExpression: 'playlistId = :pid',
        ExpressionAttributeValues: {
            ':pid': playlistId,
        },
    }).promise();

    const deleteRequests = result.Items?.map(item => ({
        DeleteRequest: {
            Key: { id: item.id },
        },
    })) || [];

    if (deleteRequests.length > 0) {
        await db.batchWrite({
            RequestItems: {
                [env.PLAYLIST_TRACK_TABLE_NAME!]: deleteRequests,
            },
        }).promise();
    }

    return jsonResponse(200, { deleted: deleteRequests.length });
};
