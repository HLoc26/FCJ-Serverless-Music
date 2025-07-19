import { APIGatewayProxyResult } from "aws-lambda";
import { DynamoDB } from "aws-sdk";
import { jsonResponse } from "../../utils/response";

const dynamoDb = new DynamoDB.DocumentClient();

export const getAllTracks = async (): Promise<APIGatewayProxyResult> => {
    const params = {
        TableName: "TrackTable",
    };
    try {
        const result = await dynamoDb.scan(params).promise();
        return jsonResponse(200, result.Items);
    } catch (error: any) {
        return jsonResponse(500, { message: error.message });
    }
};
