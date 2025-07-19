import { env } from '$amplify/env/UserHandler';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { jsonResponse } from '../../utils/response';

const dynamoDb = new DynamoDB.DocumentClient();

export const getUserTracks = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const userId = event.pathParameters?.id
    const params = {
        TableName: env.TRACK_TABLE_NAME,
        IndexName: "byUserId",
        KeyConditionExpression: "uploadedBy = :uid",
        ExpressionAttributeValues: {
            ":uid": userId,
        },
    };

    try {
        const result = await dynamoDb.query(params).promise()
        return jsonResponse(200, result.Items)
    } catch (error: any) {
        console.error("Error querying tracks by userId", error);
        return jsonResponse(500, { message: error.message });
    }
}
