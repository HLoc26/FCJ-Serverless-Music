import type { Playlist } from "../../interfaces";
import { Music, User } from "lucide-react";

interface PlaylistCardProps {
	playlist: Playlist;
	onClick?: () => void;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist, onClick }) => (
	<div className="bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg hover:bg-gray-700 transition-all cursor-pointer" onClick={onClick}>
		<div className="flex flex-col items-center text-center">
			<div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
				<Music className="w-12 h-12 text-white" />
			</div>
			<h3 className="font-bold text-lg text-white mb-2">{playlist.name}</h3>
			<p className="text-sm text-gray-300 mb-3 line-clamp-2">{playlist.description}</p>
			<div className="flex items-center space-x-4 text-xs text-gray-400">
				<div className="flex items-center space-x-1">
					<Music className="w-3 h-3" />
					<span>{playlist.trackCount} tracks</span>
				</div>
				<div className="flex items-center space-x-1">
					<User className="w-3 h-3" />
					<span>{playlist.creator}</span>
				</div>
			</div>
		</div>
	</div>
);

export default PlaylistCard;
