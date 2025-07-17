
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { jsonResponse } from '../../utils/response';

import { env } from "$amplify/env/FavouriteHandler"

const db = new DynamoDB.DocumentClient();

export const getFavourites = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const userId = event.requestContext.authorizer?.jwt?.claims?.sub;
    if (!userId) return jsonResponse(401, { message: 'Unauthorized' });

    const result = await db.query({
        TableName: env.FAVOURITE_TABLE_NAME!,
        KeyConditionExpression: 'userId = :uid',
        ExpressionAttributeValues: { ':uid': userId },
    }).promise();

    return jsonResponse(200, { favourites: result.Items });
};
