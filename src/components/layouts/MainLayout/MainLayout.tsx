import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import { Header, Sidebar, MusicPlayerBar } from "../../../components";
import type { User } from "../../../interfaces";

interface MainLayoutProps {
	currentUser: User | null;
}

// Main Component
const MainLayout: React.FC<MainLayoutProps> = ({ currentUser }) => {
	const [currentTrack, setCurrentTrack] = useState({});

	const [isPlaying, setIsPlaying] = useState(false);
	const [volume, setVolume] = useState(0.7);
	const [isMuted, setIsMuted] = useState(false);
	const [isRepeat, setIsRepeat] = useState(false);
	const [isShuffle, setIsShuffle] = useState(false);
	const [isLiked, setIsLiked] = useState(false);

	// Event handlers
	const handleSeek = (time: number) => {
		setCurrentTrack((prev) => ({ ...prev, currentTime: time }));
	};

	const handleVolumeChange = (newVolume: number) => {
		setVolume(newVolume);
		if (newVolume === 0) {
			setIsMuted(true);
		} else if (isMuted) {
			setIsMuted(false);
		}
	};

	const handleSearch = (query: string) => {
		console.log("Search query:", query);
		// Implement search functionality
	};

	const handleUserClick = (userId: string) => {
		console.log("Navigate to user:", userId);
		// Implement user navigation
	};

	return (
		<div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
			<Header currentUser={currentUser} onSearch={handleSearch} />

			<div className="flex flex-1 overflow-hidden">
				<Sidebar favoriteUsers={[]} onUserClick={handleUserClick} />

				<main className="flex-1 p-8 overflow-y-auto">
					<Outlet />
				</main>
			</div>

			<MusicPlayerBar
				currentTrack={currentTrack}
				isPlaying={isPlaying}
				volume={volume}
				isMuted={isMuted}
				isRepeat={isRepeat}
				isShuffle={isShuffle}
				isLiked={isLiked}
				onTogglePlay={() => setIsPlaying(!isPlaying)}
				onToggleMute={() => setIsMuted(!isMuted)}
				onToggleRepeat={() => setIsRepeat(!isRepeat)}
				onToggleShuffle={() => setIsShuffle(!isShuffle)}
				onToggleLike={() => setIsLiked(!isLiked)}
				onVolumeChange={handleVolumeChange}
				onSeek={handleSeek}
				onPrevious={() => console.log("Previous track")}
				onNext={() => console.log("Next track")}
			/>
		</div>
	);
};

export default MainLayout;
