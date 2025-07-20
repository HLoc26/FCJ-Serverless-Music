import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { getUser } from './services/getUser';
import { putUser } from './services/putUser';
import { getUserTracks } from './services/getUserTracks';
import { getUserPlaylists } from './services/getUserPlaylists';
import { jsonResponse } from '../utils/response';

const dynamoDb = new DynamoDB.DocumentClient();

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log(event.httpMethod, event.resource)
    if (event.httpMethod === 'GET' && event.resource === '/user/profile') return await getUser(event)
    else if (event.httpMethod === 'PUT' && event.resource === '/user/profile') return await putUser(event)
    else if (event.httpMethod === 'GET' && event.resource === '/user/{id}/tracks') return await getUserTracks(event)
    else if (event.httpMethod === 'GET' && event.resource === '/user/{id}/playlists') return await getUserPlaylists(event)
    else return jsonResponse(404, { message: 'Not Found' });
};