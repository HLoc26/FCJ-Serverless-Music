import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { jsonResponse } from '../../utils/response';
import { env } from "$amplify/env/PlaylistHandler"

const db = new DynamoDB.DocumentClient();

export const deletePlaylistById = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const userId = event.requestContext.authorizer?.jwt?.claims?.sub;
    if (!userId) return jsonResponse(401, { message: 'Unauthorized' });

    const playlistId = event.pathParameters?.id || event.path.split('/').pop();
    if (!playlistId) return jsonResponse(400, { message: 'Missing playlist ID' });

    await db.delete({
        TableName: env.PLAYLIST_TABLE_NAME!,
        Key: { id: playlistId },
    }).promise();

    return jsonResponse(200, { message: 'Playlist deleted' });
};