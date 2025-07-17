import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { DynamoDB } from "aws-sdk"

const dynamoDb = new DynamoDB.DocumentClient();

export const getTrackById = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const trackId = event.pathParameters?.id;
    const params = {
        TableName: 'TrackTable',
        Key: { id: trackId },
    };
    try {
        const result = await dynamoDb.get(params).promise();
        if (result.Item) {
            return { statusCode: 200, body: JSON.stringify(result.Item) };
        } else {
            return { statusCode: 404, body: JSON.stringify({ message: 'Track not found' }) };
        }
    } catch (error: any) {
        return { statusCode: 500, body: JSON.stringify({ message: error.message }) };
    }
}