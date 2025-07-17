import { env } from '$amplify/env/UserHandler';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { jsonResponse } from '../../utils/response';

const dynamoDb = new DynamoDB.DocumentClient();

export const putUser = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const userId = event.requestContext.authorizer?.claims.sub; // Extract user ID from Cognito
    const body = JSON.parse(event.body ?? "");
    const params = {
        TableName: env.USER_TABLE_NAME,
        Key: { id: userId },
        UpdateExpression: 'set #username = :username, #email = :email',
        ExpressionAttributeNames: {
            '#username': 'username',
            '#email': 'email',
        },
        ExpressionAttributeValues: {
            ':username': body.username,
            ':email': body.email,
        },
        ReturnValues: 'UPDATED_NEW',
    };
    try {
        const result = await dynamoDb.update(params).promise();
        return jsonResponse(200, result.Attributes);
    } catch (error: any) {
        return jsonResponse(500, { message: error.message });
    }
}