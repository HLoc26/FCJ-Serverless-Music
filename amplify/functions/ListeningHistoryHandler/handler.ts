import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getHistory } from './services/getHistory';
import { postHistory } from './services/postHistory';
import { jsonResponse } from '../utils/response';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const { httpMethod, path } = event;

    try {
        if (httpMethod === 'GET' && path === '/history') return getHistory(event);
        if (httpMethod === 'POST' && path === '/history') return postHistory(event);
        return jsonResponse(404, { message: 'Not Found' });
    } catch (err) {
        console.error(err);
        return jsonResponse(500, { message: 'Internal Server Error', error: err });
    }
};

