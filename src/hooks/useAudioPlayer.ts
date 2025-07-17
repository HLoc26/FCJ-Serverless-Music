import { useEffect, useRef, useState } from "react";
import { type Track } from "../interfaces";

export function useAudioPlayer() {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const [currentTrack, setCurrentTrack] = useState<Track>({
        id: "",
        title: "",
        duration: 0,
        url: "",
        playCount: 0,
        likeCount: 0,
        uploadedBy: "",
    });

    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.7);
    const [isMuted, setIsMuted] = useState(false);
    const [isRepeat, setIsRepeat] = useState(false);
    const [isShuffle, setIsShuffle] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);

    // Set volume and mute
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
            audioRef.current.muted = isMuted;
        }
    }, [volume, isMuted]);

    // Play or pause
    useEffect(() => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.play().catch(console.error);
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    // Update currentTime
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const timeUpdateHandler = () => setCurrentTime(audio.currentTime);
        const endedHandler = () => {
            if (isRepeat) {
                audio.currentTime = 0;
                audio.play();
            } else {
                setIsPlaying(false);
            }
        };

        audio.addEventListener("timeupdate", timeUpdateHandler);
        audio.addEventListener("ended", endedHandler);

        return () => {
            audio.removeEventListener("timeupdate", timeUpdateHandler);
            audio.removeEventListener("ended", endedHandler);
        };
    }, [isRepeat]);

    const togglePlay = () => setIsPlaying((prev) => !prev);
    const toggleMute = () => setIsMuted((prev) => !prev);
    const toggleRepeat = () => setIsRepeat((prev) => !prev);
    const toggleShuffle = () => setIsShuffle((prev) => !prev);
    const toggleLike = () => setIsLiked((prev) => !prev);

    const handleSeek = (time: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    const handleVolumeChange = (newVolume: number) => {
        setVolume(newVolume);
        setIsMuted(newVolume === 0);
    };

    const playTrack = (track: Track) => {
        // console.log(track)
        // console.log(audioRef)
        setCurrentTrack(track);
        setIsPlaying(true);
    };

    return {
        audioRef,
        currentTrack,
        isPlaying,
        volume,
        isMuted,
        isRepeat,
        isShuffle,
        isLiked,
        currentTime,

        togglePlay,
        toggleMute,
        toggleRepeat,
        toggleShuffle,
        toggleLike,
        handleSeek,
        handleVolumeChange,
        playTrack,
    };
}
