import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { jsonResponse } from '../../utils/response';

import { env } from "$amplify/env/PlaylistHandler"

const db = new DynamoDB.DocumentClient();

export const postTrackToPlaylist = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const userId = event.requestContext.authorizer?.claims?.sub;
    if (!userId) return jsonResponse(401, { message: 'Unauthorized' });

    const playlistId = event.pathParameters?.id || event.path.split('/')[2];
    const body = JSON.parse(event.body || '{}');

    const item = {
        id: uuidv4(),
        playlistId,
        trackId: body.trackId,
        addedAt: new Date().toISOString(),
    };

    await db.put({ TableName: env.PLAYLIST_TRACK_TABLE_NAME, Item: item }).promise();
    return jsonResponse(201, { added: item });
};