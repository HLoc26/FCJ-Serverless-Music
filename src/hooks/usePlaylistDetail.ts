import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPlaylistInfo, fetchPlaylistTracks } from "../api/playlists";
import type { Playlist, Track } from "../interfaces";
import type { ToasterProps } from "../interfaces/Toaster";
import { useCache } from "../hooks/useCache";

export const usePlaylistDetail = (playlistId: string | undefined) => {
    const navigate = useNavigate();
    const { data, setTracksOfPlaylist } = useCache();

    const [playlist, setPlaylist] = useState<Playlist | null>(null);
    const [tracks, setTracks] = useState<Track[]>([]);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState<ToasterProps | null>(null);

    useEffect(() => {
        if (!playlistId) {
            navigate(-1);
            return;
        }

        const cachedTracks = data.playlistTracks[playlistId];
        const shouldUseCache = !!cachedTracks;

        const fetchData = async () => {
            try {
                setLoading(true);

                // Luôn fetch playlist info
                const playlistRes = await fetchPlaylistInfo(playlistId);
                if (playlistRes.status !== 200) throw new Error(playlistRes.data?.message);
                setPlaylist(playlistRes.data);

                if (shouldUseCache) {
                    setTracks(cachedTracks);
                } else {
                    const tracksRes = await fetchPlaylistTracks(playlistId);
                    if (tracksRes.status !== 200) throw new Error(tracksRes.data?.message);
                    setTracks(tracksRes.data);
                    setTracksOfPlaylist(playlistId, tracksRes.data);
                }
            } catch (err: any) {
                setToast({ message: err.message, type: "error" });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [playlistId, navigate]);

    return { playlist, tracks, loading, toast, setToast };
};
