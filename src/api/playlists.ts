// import type { Playlist } from "../../interfaces"
import axiosInstance from "./client"

export const getPlaylists = async () => {
    const response = await axiosInstance.get("playlists");
    return response;
}

export const createPlaylist = async (name: string) => {
    const response = await axiosInstance.post("playlists", { name });
    return response;
}

export const fetchPlaylistInfo = async (playlistId: string) => {
    const response = await axiosInstance.get(`playlists/${playlistId}`);
    return response;
}

export const fetchPlaylistTracks = async (playlistId: string) => {
    const response = await axiosInstance.get(`playlists/${playlistId}/tracks`);
    return response;
}