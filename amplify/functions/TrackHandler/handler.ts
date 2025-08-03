import { APIGatewayProxyEvent } from "aws-lambda";

import { getTrackById } from './services/getTrackById';
import { deleteTrackById } from "./services/deleteTrackById";
import { postUploadTrack } from './services/postUploadTrack';

export const handler = async (event: APIGatewayProxyEvent) => {
    // GET /tracks/{id}
    if (event.httpMethod === 'GET' && event.resource === '/tracks/{id}') return await getTrackById(event);
    // DELETE /tracks/{id}
    else if (event.httpMethod === 'DELETE' && event.resource === '/tracks/{id}') return await deleteTrackById(event)
    // POST /tracks/upload
    else if (event.httpMethod === 'POST' && event.path === '/tracks/upload') return await postUploadTrack(event);
    // INVALID REQUEST
    return { statusCode: 404, body: JSON.stringify({ message: 'Not Found' }) };
};