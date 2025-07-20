import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { jsonResponse } from '../../utils/response';
import { env } from '$amplify/env/PlaylistHandler';

const db = new DynamoDB.DocumentClient();

export const getPlaylistById = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const playlistId = event.pathParameters?.id;
    if (!playlistId) return jsonResponse(400, { message: 'Missing playlist ID' });

    const params = {
        TableName: env.PLAYLIST_TABLE_NAME,
        Key: { id: playlistId },
    };

    try {
        const result = await db.get(params).promise();
        if (!result.Item) {
            return jsonResponse(404, { message: 'Playlist not found' });
        }
        return jsonResponse(200, result.Item);
    } catch (error: any) {
        console.error('Error fetching playlist:', error);
        return jsonResponse(500, { message: error.message });
    }
};
