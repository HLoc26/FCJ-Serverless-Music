import type { Track } from "../../../interfaces";

import PlayerControls from "./PlayerControls";
import ProgressBar from "./ProgressBar";
import TrackInfo from "./TrackInfo";
import VolumeControl from "./VolumeControl";

interface MusicPlayerBarProps {
	currentTrack: object;
	isPlaying: boolean;
	volume: number;
	isMuted: boolean;
	isRepeat: boolean;
	isShuffle: boolean;
	isLiked: boolean;
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

// Music Player Bar Component
const MusicPlayerBar: React.FC<MusicPlayerBarProps> = ({
	currentTrack,
	isPlaying,
	volume,
	isMuted,
	isRepeat,
	isShuffle,
	isLiked,
	onTogglePlay,
	onToggleMute,
	onToggleRepeat,
	onToggleShuffle,
	onToggleLike,
	onVolumeChange,
	onSeek,
	onPrevious,
	onNext,
}) => (
	<div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-6 py-4">
		<div className="flex items-center justify-between">
			<TrackInfo track={currentTrack} isLiked={isLiked} onToggleLike={onToggleLike} />

			<div className="flex flex-col items-center gap-2 flex-2 max-w-md mx-8">
				<PlayerControls
					isPlaying={isPlaying}
					isShuffle={isShuffle}
					isRepeat={isRepeat}
					onTogglePlay={onTogglePlay}
					onToggleShuffle={onToggleShuffle}
					onToggleRepeat={onToggleRepeat}
					onPrevious={onPrevious}
					onNext={onNext}
				/>
				<ProgressBar currentTime={currentTrack.currentTime} duration={currentTrack.duration} onSeek={onSeek} />
			</div>

			<VolumeControl volume={volume} isMuted={isMuted} onVolumeChange={onVolumeChange} onToggleMute={onToggleMute} />
		</div>
	</div>
);

export default MusicPlayerBar;
