import { APIGatewayProxyResult } from "aws-lambda";
import { DynamoDB } from "aws-sdk"

const dynamoDb = new DynamoDB.DocumentClient();

export const getAllTracks = async (): Promise<APIGatewayProxyResult> => {
    const params = {
        TableName: 'TrackTable',
    };
    try {
        const result = await dynamoDb.scan(params).promise();
        return { statusCode: 200, body: JSON.stringify(result.Items) };
    } catch (error: any) {
        return { statusCode: 500, body: JSON.stringify({ message: error.message }) };
    }
}