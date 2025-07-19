import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { jsonResponse } from '../../utils/response';

import { env } from "$amplify/env/FavouriteHandler"

const db = new DynamoDB.DocumentClient();

export const deleteFavourite = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const userId = event.requestContext.authorizer?.claims?.sub;
    if (!userId) return jsonResponse(401, { message: 'Unauthorized' });

    const body = JSON.parse(event.body || '{}');
    const { trackId } = body;
    if (!trackId) return jsonResponse(400, { message: 'Missing trackId' });

    await db.delete({
        TableName: env.FAVOURITE_TABLE_NAME!,
        Key: { userId, trackId },
    }).promise();

    return jsonResponse(200, { deleted: trackId });
};
