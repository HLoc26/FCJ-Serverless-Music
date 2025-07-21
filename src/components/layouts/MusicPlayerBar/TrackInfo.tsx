import { Heart, Plus } from "lucide-react";
import type { Track } from "../../../interfaces";
import { Music } from "lucide-react";

interface TrackInfoProps {
	track: Track;
	isLiked: boolean;
	onToggleLike: () => void;
	onAddToPlaylist: () => void;
}

const TrackInfo: React.FC<TrackInfoProps> = ({ track, isLiked, onToggleLike, onAddToPlaylist }) => (
	<div className="flex items-center gap-4 min-w-0 flex-1">
		<div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-md flex items-center justify-center flex-shrink-0">
			<Music className="w-6 h-6 text-white" />
		</div>
		<div className="min-w-0">
			<h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">{track.title}</h3>
			<p className="text-sm text-gray-600 dark:text-gray-400 truncate">{track.uploadedBy}</p>
		</div>

		{/* Like button */}
		<button onClick={onToggleLike} className={`p-2 rounded-full transition-colors ${isLiked ? "text-red-500 hover:text-red-600" : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"}`}>
			<Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
		</button>

		{/* Add to Playlist button */}
		<button onClick={onAddToPlaylist} className="p-2 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
			<Plus className="w-5 h-5" />
		</button>
	</div>
);

export default TrackInfo;
