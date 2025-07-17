import type { Track } from "./Track";

export interface AudioPlayer {
    currentTrack: Track;
    isPlaying: boolean;
    volume: number;
    isMuted: boolean;
    isRepeat: boolean;
    isShuffle: boolean;
    isLiked: boolean;
    currentTime: number;
    onTogglePlay: () => void;
    onToggleMute: () => void;
    onToggleRepeat: () => void;
    onToggleShuffle: () => void;
    onToggleLike: () => void;
    onVolumeChange: (volume: number) => void;
    onSeek: (time: number) => void;
    onPrevious: () => void;
    onNext: () => void;
}