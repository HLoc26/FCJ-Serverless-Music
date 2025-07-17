import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { getUser } from './services/getUser';
import { putUser } from './services/putUser';

const dynamoDb = new DynamoDB.DocumentClient();

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    if (event.httpMethod === 'GET') return await getUser(event)
    else if (event.httpMethod === 'PUT') return await putUser(event)
    else return { statusCode: 400, body: JSON.stringify({ message: 'Invalid request' }) };
};