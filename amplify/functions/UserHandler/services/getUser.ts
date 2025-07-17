import { env } from '$amplify/env/UserHandler';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { jsonResponse } from '../../utils/response';

const dynamoDb = new DynamoDB.DocumentClient();

export const getUser = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const userId = event.requestContext.authorizer?.claims.sub; // Extract user ID from Cognito
    const params = {
        TableName: env.USER_TABLE_NAME,
        Key: { id: userId },
    };
    try {
        const result = await dynamoDb.get(params).promise();
        if (result.Item) {
            return jsonResponse(200, result.Item);
        } else {
            return jsonResponse(404, { message: 'User not found' });
        }
    } catch (error: any) {
        return jsonResponse(500, { message: error.message });
    }
}