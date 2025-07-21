import { useState, useEffect, useCallback } from "react";
import { useCache } from "./useCache";
import type { Track } from "../interfaces";
import axiosInstance from "../api/client";

export const usePlaylistTracks = (playlistId?: string) => {
    const { data, setTracksOfPlaylist } = useCache();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchPlaylistTracks = async (id: string): Promise<Track[]> => {
        setLoading(true);
        setError(null);

        try {
            const response = await axiosInstance.get(`/playlists/${id}/tracks`);

            if (response.status !== 200) {
                throw new Error(response.data.message || "Failed to fetch playlist tracks");
            }

            const tracks = response.data;

            // Cập nhật cache
            setTracksOfPlaylist(id, tracks);

            return tracks;
        } catch (err: any) {
            setError(err.message);
            return [];
        } finally {
            setLoading(false);
        }
    };

    const getTracksFromCache = (id: string): Track[] => {
        return data.playlistTracks[id] || [];
    };

    const isTrackInPlaylist = useCallback((playlistId: string, trackId: string): boolean => {
        const tracks = data.playlistTracks[playlistId] || [];
        return tracks.some((track) => track.id === trackId);
    }, [data.playlistTracks]);

    // Auto fetch khi playlistId thay đổi và chưa có trong cache
    useEffect(() => {
        if (playlistId && !data.playlistTracks[playlistId]) {
            fetchPlaylistTracks(playlistId);
        }
    }, [playlistId]);

    return {
        loading,
        error,
        fetchPlaylistTracks,
        getTracksFromCache,
        isTrackInPlaylist,
        // Helper để lấy tracks của playlist hiện tại
        tracks: playlistId ? getTracksFromCache(playlistId) : [],
    };
};