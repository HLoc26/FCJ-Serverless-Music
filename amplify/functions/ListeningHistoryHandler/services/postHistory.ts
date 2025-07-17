import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { jsonResponse } from '../../utils/response';

import { env } from "$amplify/env/ListeningHistoryHandler"

const db = new DynamoDB.DocumentClient();

export const postHistory = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const userId = event.requestContext.authorizer?.jwt?.claims?.sub;
    if (!userId) return jsonResponse(401, { message: 'Unauthorized' });

    const body = JSON.parse(event.body || '{}');
    const { trackId } = body;
    if (!trackId) return jsonResponse(400, { message: 'Missing trackId' });

    const item = {
        userId,
        timestamp: new Date().toISOString(),
        trackId,
    };

    await db.put({
        TableName: env.PLAYBACK_HISTORY_TABLE_NAME!,
        Item: item,
    }).promise();

    return jsonResponse(201, { inserted: item });
};
