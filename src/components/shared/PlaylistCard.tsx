import { Play } from "lucide-react";

import type { Playlist } from "../../interfaces";

interface PlaylistCardProps {
	playlist: Playlist;
	onClick: () => void;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist, onClick }) => (
	<div onClick={onClick} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group">
		<div className={`w-full h-48 ${playlist.gradient || "bg-gradient-to-br from-blue-400 to-purple-500"} rounded-lg mb-4 relative overflow-hidden`}>
			{playlist.coverUrl ? <img src={playlist.coverUrl} alt={playlist.title} className="w-full h-full object-cover" /> : null}
			<div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
				<Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-all duration-200 transform scale-75 group-hover:scale-100" />
			</div>
		</div>
		<h3 className="font-semibold text-lg mb-1 truncate">{playlist.title}</h3>
		<p className="text-gray-600 dark:text-gray-400 text-sm mb-1">by {playlist.creator}</p>
		<p className="text-gray-500 dark:text-gray-500 text-xs">{playlist.trackCount} tracks</p>
	</div>
);

export default PlaylistCard;
