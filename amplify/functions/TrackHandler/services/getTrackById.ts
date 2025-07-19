import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { DynamoDB } from "aws-sdk"
import { jsonResponse } from "../../utils/response";

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
            return jsonResponse(200, result.Item);
        } else {
            return jsonResponse(404, { message: 'Track not found' });
        }
    } catch (error: any) {
        return jsonResponse(500, { message: error.message });
    }
}