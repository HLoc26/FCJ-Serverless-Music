import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { env } from "$amplify/env/TrackHandler"

import { DynamoDB } from "aws-sdk"
import { jsonResponse } from "../../utils/response";

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
            return jsonResponse(200, { url: result.Item.url });
        } else {
            return jsonResponse(404, { message: 'Track not found' });
        }
    } catch (error: any) {
        return jsonResponse(500, { message: error.message });
    }
}