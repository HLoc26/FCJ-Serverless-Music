import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { jsonResponse } from '../../utils/response';

import { env } from "$amplify/env/PlaylistHandler";

const db = new DynamoDB.DocumentClient();

export const postTrackToPlaylist = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    const userId = event.requestContext.authorizer?.claims?.sub;
    if (!userId) return jsonResponse(401, { message: 'Unauthorized' });

    const playlistId = event.pathParameters?.id || event.path.split('/')[2];
    const body = JSON.parse(event.body || '{}');
    const trackId = body.trackId;

    if (!trackId) return jsonResponse(400, { message: 'Missing trackId in request body' });

    const item = {
        playlistId,
        trackId,
        addedAt: new Date().toISOString(),
    };

    try {
        await db
            .put({
                TableName: env.PLAYLIST_TRACK_TABLE_NAME,
                Item: item,
                ConditionExpression: 'attribute_not_exists(playlistId) AND attribute_not_exists(trackId)',
            })
            .promise();

        return jsonResponse(201, { added: item });
    } catch (error: any) {
        if (error.code === 'ConditionalCheckFailedException') {
            return jsonResponse(409, { message: 'Track already exists in this playlist' });
        }
        console.error('Error adding track to playlist:', error);
        return jsonResponse(500, { message: 'Internal server error' });
    }
};
