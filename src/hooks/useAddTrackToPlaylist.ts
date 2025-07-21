import { useState } from "react";
import { useCache } from "./useCache";
import type { Track } from "../interfaces";
import axiosInstance from "../api/client";

export const useAddTrackToPlaylist = () => {
    const { data, setTracksOfPlaylist, setUserPlaylists } = useCache();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const addTrack = async (playlistId: string, track: Track): Promise<boolean> => {
        setLoading(true);
        setError(null);
        const trackId = track.id

        try {
            const response = await axiosInstance.post(`/playlists/${playlistId}/track`, { trackId });
            console.log(response)

            if (response.status !== 201) {
                throw new Error(response.data.message || "Failed to add track");
            }

            // Cập nhật cache local: thêm track vào playlistTracks
            const existingTracks = data.playlistTracks[playlistId] ?? [];
            // Tránh thêm track trùng
            const alreadyExists = existingTracks.some(t => t.id === trackId);
            console.log("In hook", track)

            if (!alreadyExists) {
                setTracksOfPlaylist(playlistId, [...existingTracks, track]);
                const existingPlaylist = data.userPlaylists.find(p => p.id === playlistId);
                if (existingPlaylist) {
                    const updatedPlaylist = {
                        ...existingPlaylist,
                        trackCount: (existingPlaylist.trackCount || 0) + 1,
                    };
                    setUserPlaylists({
                        ...data.userPlaylists,
                        [playlistId]: updatedPlaylist,
                    });
                }
            }

            return true;
        } catch (err: any) {
            setError(err.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, addTrack };
};
