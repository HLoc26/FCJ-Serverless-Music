import { createContext, useState } from "react";
import type { CacheContextType, CacheData } from "../interfaces/CacheData";
import type { Playlist, Track } from "../interfaces";

const defaultCacheData: CacheData = {
	userPlaylists: [],
	userTracks: [],
	playlistTracks: {},
};

export const CacheContext = createContext<CacheContextType | undefined>(undefined);

export const CacheProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [data, setData] = useState<CacheData>(defaultCacheData);

	const setUserPlaylists = (playlists: Playlist[]) => {
		setData((prev) => ({ ...prev, userPlaylists: playlists }));
	};

	const setUserTracks = (tracks: Track[]) => {
		setData((prev) => ({ ...prev, userTracks: tracks }));
	};

	const setTracksOfPlaylist = (playlistId: string, tracks: Track[]) => {
		setData((prev) => ({
			...prev,
			playlistTracks: { ...prev.playlistTracks, [playlistId]: tracks },
		}));
	};

	const clearCache = () => setData(defaultCacheData);

	return <CacheContext.Provider value={{ data, setUserPlaylists, setUserTracks, setTracksOfPlaylist, clearCache }}>{children}</CacheContext.Provider>;
};
