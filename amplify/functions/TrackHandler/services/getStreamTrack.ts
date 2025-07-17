import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { env } from "$amplify/env/TrackHandler"

import { DynamoDB } from "aws-sdk"

const dynamoDb = new DynamoDB.DocumentClient();

export const getStreamTrack = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const trackId = event.pathParameters?.id;
    if (!trackId) {
        return { statusCode: 400, body: JSON.stringify({ message: 'Missing trackId' }) };
    }
    const params = {
        TableName: env.TRACK_TABLE_NAME,
        Key: { id: trackId },
        ProjectionExpression: 'url',
    };
    try {
        const result = await dynamoDb.get(params).promise();
        if (result.Item) {
            return { statusCode: 200, body: JSON.stringify({ url: result.Item.url }) };
        } else {
            return { statusCode: 404, body: JSON.stringify({ message: 'Track not found' }) };
        }
    } catch (error: any) {
        return { statusCode: 500, body: JSON.stringify({ message: error.message }) };
    }
}