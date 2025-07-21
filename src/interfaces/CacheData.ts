import type { Playlist } from "./Playlist";
import type { Track } from "./Track";

export interface CacheData {
    userPlaylists: Playlist[];
    userTracks: Track[];
    playlistTracks: Record<string, Track[]>;
}

export interface CacheContextType {
    data: CacheData;
    setUserPlaylists: (playlists: Playlist[]) => void;
    setUserTracks: (tracks: Track[]) => void;
    setTracksOfPlaylist: (playlistId: string, tracks: Track[]) => void;
    clearCache: () => void;
}