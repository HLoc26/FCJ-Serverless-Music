import { Volume2, VolumeX } from "lucide-react";

interface VolumeControlProps {
	volume: number;
	isMuted: boolean;
	onVolumeChange: (volume: number) => void;
	onToggleMute: () => void;
}

// Volume Control Component
const VolumeControl: React.FC<VolumeControlProps> = ({ volume, isMuted, onVolumeChange, onToggleMute }) => {
	const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newVolume = parseFloat(e.target.value);
		onVolumeChange(newVolume);
	};

	return (
		<div className="flex items-center gap-3 min-w-0 flex-1 justify-end">
			<button onClick={onToggleMute} className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
				{isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
			</button>
			<input
				type="range"
				min="0"
				max="1"
				step="0.01"
				value={isMuted ? 0 : volume}
				onChange={handleVolumeChange}
				className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
				style={{
					background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(isMuted ? 0 : volume) * 100}%, #e5e7eb ${(isMuted ? 0 : volume) * 100}%, #e5e7eb 100%)`,
				}}
			/>
		</div>
	);
};

export default VolumeControl;
