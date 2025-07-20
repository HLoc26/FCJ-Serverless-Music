// import type { Playlist } from "../../interfaces"
import axiosInstance from "./client"

export const getPlaylists = async () => {
    try {
        const response = await axiosInstance.get("playlists")
        return response
    } catch (error: any) {
        console.log(error);
        throw error;
    }
}