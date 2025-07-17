import React, { createContext, useContext } from "react";
import { useAudioPlayer } from "../hooks/useAudioPlayer";

const MusicPlayerContext = createContext<ReturnType<typeof useAudioPlayer> | null>(null);

export const MusicPlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const player = useAudioPlayer();
	return (
		<MusicPlayerContext.Provider value={player}>
			<audio ref={player.audioRef} src={player.currentTrack.url} preload="metadata" />
			{children}{" "}
		</MusicPlayerContext.Provider>
	);
};

export const useMusicPlayerContext = () => {
	const context = useContext(MusicPlayerContext);
	if (!context) {
		throw new Error("useMusicPlayerContext must be used within a MusicPlayerProvider");
	}
	return context;
};
