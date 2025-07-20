import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { jsonResponse } from '../../utils/response';
import { env } from "$amplify/env/PlaylistHandler"


const db = new DynamoDB.DocumentClient();

export const postPlaylists = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const userId = event.requestContext.authorizer?.claims?.sub;
    if (!userId) return jsonResponse(401, { message: 'Unauthorized' });

    const body = JSON.parse(event.body || '{}');
    try {
        const playlistId = uuidv4();
        const item = {
            id: playlistId,
            owner: userId,
            name: body.name,
            trackCount: 0,
            createdAt: new Date().toISOString(),
        };

        await db.put({ TableName: env.PLAYLIST_TABLE_NAME!, Item: item }).promise();
        return jsonResponse(201, { playlist: item });
    } catch (error: any) {
        return jsonResponse(500, { message: error.message })
    }
};
