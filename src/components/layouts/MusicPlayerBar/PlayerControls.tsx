import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle } from "lucide-react";

interface PlayerControlsProps {
	isPlaying: boolean;
	isShuffle: boolean;
	isRepeat: boolean;
	onTogglePlay: () => void;
	onToggleShuffle: () => void;
	onToggleRepeat: () => void;
	onPrevious: () => void;
	onNext: () => void;
}
// Player Controls Component
const PlayerControls: React.FC<PlayerControlsProps> = ({ isPlaying, isShuffle, isRepeat, onTogglePlay, onToggleShuffle, onToggleRepeat, onPrevious, onNext }) => (
	<div className="flex items-center gap-4">
		<button
			onClick={onToggleShuffle}
			className={`p-2 rounded-full transition-colors ${
				isShuffle ? "text-blue-600 bg-blue-100 dark:bg-blue-900/20" : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
			}`}
		>
			<Shuffle className="w-4 h-4" />
		</button>

		<button onClick={onPrevious} className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
			<SkipBack className="w-5 h-5" />
		</button>

		<button onClick={onTogglePlay} className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors">
			{isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
		</button>

		<button onClick={onNext} className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
			<SkipForward className="w-5 h-5" />
		</button>

		<button
			onClick={onToggleRepeat}
			className={`p-2 rounded-full transition-colors ${
				isRepeat ? "text-blue-600 bg-blue-100 dark:bg-blue-900/20" : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
			}`}
		>
			<Repeat className="w-4 h-4" />
		</button>
	</div>
);

export default PlayerControls;
