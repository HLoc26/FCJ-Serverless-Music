import { useRef } from "react";
import { formatTime } from "../../../utils/trackProcessing";
// Progress Bar Component
interface ProgressBarProps {
	currentTime: number;
	duration: number;
	onSeek: (time: number) => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentTime, duration, onSeek }) => {
	const progressRef = useRef<HTMLDivElement>(null);

	const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (progressRef.current) {
			const rect = progressRef.current.getBoundingClientRect();
			const clickX = e.clientX - rect.left;
			const percentage = clickX / rect.width;
			const newTime = Math.floor(percentage * duration);
			onSeek(newTime);
		}
	};

	return (
		<div className="flex items-center gap-3 w-full">
			<span className="text-xs text-gray-500 dark:text-gray-400 min-w-[40px]">{formatTime(currentTime)}</span>
			<div ref={progressRef} onClick={handleProgressClick} className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full cursor-pointer">
				<div className="h-full bg-blue-600 rounded-full transition-all duration-100" style={{ width: `${(currentTime / duration) * 100}%` }} />
			</div>
			<span className="text-xs text-gray-500 dark:text-gray-400 min-w-[40px]">{formatTime(duration)}</span>
		</div>
	);
};

export default ProgressBar;
