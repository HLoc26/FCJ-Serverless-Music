import { Heart } from "lucide-react";
import type { Track } from "../../../interfaces";

interface TrackInfoProps {
	track: Track;
	isLiked: boolean;
	onToggleLike: () => void;
}

// Track Info Display Component
const TrackInfo: React.FC<TrackInfoProps> = ({ track, isLiked, onToggleLike }) => (
	<div className="flex items-center gap-4 min-w-0 flex-1">
		<img src={track.coverUrl} alt={track.title} className="w-14 h-14 rounded-lg object-cover" />
		<div className="min-w-0">
			<h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">{track.title}</h3>
			<p className="text-sm text-gray-600 dark:text-gray-400 truncate">{track.artist}</p>
		</div>
		<button onClick={onToggleLike} className={`p-2 rounded-full transition-colors ${isLiked ? "text-red-500 hover:text-red-600" : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"}`}>
			<Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
		</button>
	</div>
);

export default TrackInfo;
