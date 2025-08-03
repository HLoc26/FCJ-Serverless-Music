import { APIGatewayProxyEvent } from "aws-lambda"

import { getTrackById } from './services/getTrackById';
import { getAllTracks } from './services/getAllTracks';
import { postUploadTrack } from './services/postUploadTrack';
import { deleteTrackById } from "./services/deleteTrackById";

export const handler = async (event: APIGatewayProxyEvent) => {
    // GET /tracks
    if (event.httpMethod === 'GET' && event.path === '/tracks') return await getAllTracks()
    // GET /tracks/{id}
    else if (event.httpMethod === 'GET' && event.resource === '/tracks/{id}') return await getTrackById(event)
    // DELETE /tracks/{id}
    else if (event.httpMethod === 'DELETE' && event.resource === '/tracks/{id}') return await deleteTrackById(event)
    // POST /tracks/upload
    else if (event.httpMethod === 'POST' && event.path === '/tracks/upload') return await postUploadTrack(event)
    // INVALID REQUEST
    return { statusCode: 404, body: JSON.stringify({ message: 'Not Found' }) };
};