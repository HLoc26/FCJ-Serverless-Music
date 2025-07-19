import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { jsonResponse } from '../utils/response';
import { getPlaylists } from './services/getPlaylists';
import { postPlaylists } from './services/postPlaylists';
import { deletePlaylistById } from './services/deletePlaylistById';
import { postTrackToPlaylist } from './services/postTrackToPlaylist';
import { deletePlaylistTracks } from './services/deletePlaylistTracks';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const { httpMethod, path, resource } = event;

    try {
        if (httpMethod === 'GET' && path === '/playlists') return getPlaylists(event);
        if (httpMethod === 'POST' && path === '/playlists') return postPlaylists(event);
        if (httpMethod === 'DELETE' && resource === '/playlists/{id}') return deletePlaylistById(event);
        if (httpMethod === 'POST' && resource === '/playlists/{id}/track') return postTrackToPlaylist(event);
        if (httpMethod === 'DELETE' && resource === '/playlists/{id}/tracks') return deletePlaylistTracks(event);
        return jsonResponse(404, { message: 'Not Found' });
    } catch (err) {
        console.error(err);
        return jsonResponse(500, { message: 'Internal Server Error', error: err });
    }
};
