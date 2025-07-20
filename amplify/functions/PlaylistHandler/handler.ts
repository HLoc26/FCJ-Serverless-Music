import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { jsonResponse } from '../utils/response';
import { getPlaylists } from './services/getPlaylists';
import { postPlaylists } from './services/postPlaylists';
import { deletePlaylistById } from './services/deletePlaylistById';
import { postTrackToPlaylist } from './services/postTrackToPlaylist';
import { deleteTracksFromPlaylist } from './services/deleteTracksFromPlaylist';
import { getTracksOfPlaylist } from './services/getTracksOfPlaylist';
import { getPlaylistById } from './services/getPlaylistById';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const { httpMethod, path, resource } = event;

    try {
        if (httpMethod === 'GET' && path === '/playlists') return getPlaylists(event);
        else if (httpMethod === 'POST' && path === '/playlists') return postPlaylists(event);
        else if (httpMethod === 'GET' && resource === '/playlists/{id}') return getPlaylistById(event);
        else if (httpMethod === 'DELETE' && resource === '/playlists/{id}') return deletePlaylistById(event);
        else if (httpMethod === 'POST' && resource === '/playlists/{id}/track') return postTrackToPlaylist(event);
        else if (httpMethod === 'GET' && resource === '/playlists/{id}/tracks') return getTracksOfPlaylist(event);
        else if (httpMethod === 'DELETE' && resource === '/playlists/{id}/tracks') return deleteTracksFromPlaylist(event);
        else return jsonResponse(404, { message: 'Not Found' });
    } catch (err) {
        console.error(err);
        return jsonResponse(500, { message: 'Internal Server Error', error: err });
    }
};
