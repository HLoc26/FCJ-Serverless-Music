import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getFavourites } from './services/getFavourites';
import { postFavourite } from './services/postFavourite';
import { deleteFavourite } from './services/deleteFavourite';
import { jsonResponse } from '../utils/response';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const { httpMethod, path } = event;

    try {
        if (httpMethod === 'GET' && path === '/favourites') return getFavourites(event);
        if (httpMethod === 'POST' && path === '/favourites') return postFavourite(event);
        if (httpMethod === 'DELETE' && path === '/favourites') return deleteFavourite(event);
        return jsonResponse(404, { message: 'Not Found' });
    } catch (err) {
        console.error(err);
        return jsonResponse(500, { message: 'Internal Server Error', error: err });
    }
};