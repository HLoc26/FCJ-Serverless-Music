import type { Track } from "../../interfaces";

import { Music, Clock, Play } from "lucide-react";
import { formatTime } from "../../utils/trackProcessing";
import { useMusicPlayerContext } from "../../contexts/MusicPlayerContext";

interface TrackCardProps {
	track: Track;
	onClick?: () => void;
}

const TrackCard: React.FC<TrackCardProps> = ({ track, onClick }) => {
	const { playTrack } = useMusicPlayerContext();

	return (
		<div className="bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg hover:bg-gray-700 transition-all cursor-pointer" onClick={onClick}>
			<div className="flex items-center space-x-4">
				<div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-md flex items-center justify-center flex-shrink-0">
					<Music className="w-6 h-6 text-white" />
				</div>
				<div className="flex-1 min-w-0">
					<h3 className="font-semibold text-white truncate">{track.title}</h3>
				</div>
				<div className="flex items-center space-x-2 text-gray-400">
					<Clock className="w-4 h-4" />
					<span className="text-sm">{formatTime(track.duration)}</span>
				</div>
				<button onClick={() => playTrack(track)} className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 hover:cursor-pointer transition-colors">
					<Play className="w-4 h-4 text-white ml-0.5" />
				</button>
			</div>
		</div>
	);
};

export default TrackCard;
