import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { jsonResponse } from '../../utils/response';
import { env } from "$amplify/env/ListeningHistoryHandler"

const db = new DynamoDB.DocumentClient();

export const getHistory = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const userId = event.requestContext.authorizer?.jwt?.claims?.sub;
    if (!userId) return jsonResponse(401, { message: 'Unauthorized' });

    const result = await db.query({
        TableName: env.PLAYBACK_HISTORY_TABLE_NAME!,
        KeyConditionExpression: 'userId = :uid',
        ExpressionAttributeValues: {
            ':uid': userId,
        },
        ScanIndexForward: false, // latest first
        Limit: 50,
    }).promise();

    return jsonResponse(200, { history: result.Items });
};