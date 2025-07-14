import { useQuery } from "@tanstack/react-query";
import { useRef, useState, useCallback, useEffect } from "react";
import type { Track } from "../interfaces";

export const useAudioPlayer = (trackId: string | null) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(0.7);
    const [currentTime, setCurrentTime] = useState(0);
    const [isReady, setIsReady] = useState(false);

    // Fetch track data using react query
    const { data: track, isLoading } = useQuery<Track, Error>({
        queryKey: ["track", trackId],
        queryFn: async () => {
            if (!trackId) throw new Error("No track id");
            const res = await axios.get(`/api/tracks/${trackId}`);
            return res.data;
        },
        enabled: !!trackId,
    });

    // --- Effect 1: setup audio + event listeners ---
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || !track) return;

        audio.src = `/api/tracks/${track.id}/stream`;
        audio.load();
        audio.volume = volume;
        setCurrentTime(0);
        setIsReady(false);

        const onTimeUpdate = () => setCurrentTime(audio.currentTime);
        const onCanPlay = () => setIsReady(true);

        audio.addEventListener("timeupdate", onTimeUpdate);
        audio.addEventListener("canplay", onCanPlay);

        return () => {
            audio.removeEventListener("timeupdate", onTimeUpdate);
            audio.removeEventListener("canplay", onCanPlay);
        };
    }, [track]);

    // --- Effect 2: react to state changes ---
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isMuted) audio.volume = 0;
        else audio.volume = volume;

        if (isPlaying && isReady) audio.play().catch(() => setIsPlaying(false));
        else audio.pause();
    }, [isPlaying, isMuted, volume, isReady]);

    // --- Callbacks: rõ ràng và không cần effect ---
    const togglePlay = useCallback(() => setIsPlaying((p) => !p), []);
    const toggleMute = useCallback(() => setIsMuted((m) => !m), []);
    const play = useCallback(() => setIsPlaying(true), []);
    const pause = useCallback(() => setIsPlaying(false), []);
    const seek = useCallback((time: number) => {
        const audio = audioRef.current;
        if (audio) {
            audio.currentTime = time;
            setCurrentTime(time);
        }
    }, []);

    return {
        audioRef,
        track,
        isLoading,
        isPlaying,
        isMuted,
        volume,
        currentTime,
        duration: track?.duration || 0,
        isReady,

        play,
        pause,
        togglePlay,
        toggleMute,
        setVolume,
        seek,
    };
}