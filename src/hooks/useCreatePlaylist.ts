import { useState } from "react";
import { createPlaylist } from "../api/playlists";
import { useCache } from "./useCache";
import type { Playlist } from "../interfaces/Playlist";

interface UseCreatePlaylistReturn {
    createNewPlaylist: (name: string) => Promise<boolean>;
    loading: boolean;
}

export const useCreatePlaylist = (): UseCreatePlaylistReturn => {
    const [loading, setLoading] = useState(false);
    const { data, setUserPlaylists } = useCache();

    const createNewPlaylist = async (name: string): Promise<boolean> => {
        if (!name.trim()) return false;

        try {
            setLoading(true);
            const response = await createPlaylist(name);
            if (response.status !== 201) throw new Error(response.data.message);

            const newPlaylist: Playlist = response.data.playlist;

            // Cập nhật cache ngay lập tức
            setUserPlaylists([...data.userPlaylists, newPlaylist]);
            return true;
        } catch (err) {
            console.error("Failed to create playlist:", err);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { createNewPlaylist, loading };
};
