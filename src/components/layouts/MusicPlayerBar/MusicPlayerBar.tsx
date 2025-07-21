import { useState } from "react";
import AddToPlaylistModal from "./AddToPlaylistModal";
import ProgressBar from "./ProgressBar";
import VolumeControl from "./VolumeControl";
import PlayerControls from "./PlayerControls";
import TrackInfo from "./TrackInfo";
import { useMusicPlayerContext } from "../../../contexts/MusicPlayerContext";

const MusicPlayerBar: React.FC = () => {
	const [isModalOpen, setModalOpen] = useState(false);

	const {
		currentTrack, //
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
	} = useMusicPlayerContext();

	return (
		<>
			{currentTrack.id ? (
				<div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-6 py-4">
					<div className="flex items-center justify-between">
						<TrackInfo track={currentTrack} isLiked={isLiked} onToggleLike={toggleLike} onAddToPlaylist={() => setModalOpen(true)} />

						<div className="flex flex-col items-center gap-2 flex-2 max-w-md mx-8">
							<PlayerControls
								isPlaying={isPlaying}
								isShuffle={isShuffle}
								isRepeat={isRepeat}
								onTogglePlay={togglePlay}
								onToggleShuffle={toggleShuffle}
								onToggleRepeat={toggleRepeat}
								onPrevious={() => console.log("Prev Track")}
								onNext={() => console.log("Next track")}
							/>
							<ProgressBar currentTime={currentTime} duration={currentTrack.duration} onSeek={handleSeek} />
						</div>

						<VolumeControl volume={volume} isMuted={isMuted} onVolumeChange={handleVolumeChange} onToggleMute={toggleMute} />
					</div>
				</div>
			) : null}

			{/* Modal Component */}
			{isModalOpen && <AddToPlaylistModal track={currentTrack} onClose={() => setModalOpen(false)} />}
		</>
	);
};

export default MusicPlayerBar;
