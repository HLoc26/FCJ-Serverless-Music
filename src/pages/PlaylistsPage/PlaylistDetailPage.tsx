import { useParams, useNavigate } from "react-router-dom";
import { usePlaylistDetail } from "../../hooks/usePlaylistDetail";
import TrackCard from "../../components/shared/TrackCard";
import Toaster from "../../components/shared/Toaster";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import { ArrowLeft } from "lucide-react";
import type { User } from "../../interfaces";

interface PlaylistDetailPageProps {
	currentUser: User | null;
}
const PlaylistDetailPage: React.FC<PlaylistDetailPageProps> = ({ currentUser }) => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { playlist, tracks, loading, toast, setToast } = usePlaylistDetail(id);
	const isOwner = playlist?.owner === currentUser?.id; // TODO: If current user is owner, allow them to remove track

	console.log(tracks);

	return (
		<div className="max-w-5xl mx-auto py-8 px-4">
			{toast && <Toaster message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

			{loading ? (
				<LoadingSpinner text="Loading playlist details..." />
			) : playlist ? (
				<>
					<button onClick={() => navigate(-1)} className="mb-4 text-blue-600 hover:underline flex items-center gap-2">
						<ArrowLeft size={20} />
						Back to Playlists
					</button>
					<h1 className="text-3xl font-bold mb-4">{playlist.name}</h1>

					{tracks.length > 0 ? (
						<div className="space-y-4">
							{tracks.map((track) => (
								<TrackCard key={track.id} track={track} />
							))}
						</div>
					) : (
						<p className="text-gray-500">This playlist doesn't have any tracks yet.</p>
					)}
				</>
			) : (
				<p className="text-red-500">Playlist not found.</p>
			)}
		</div>
	);
};

export default PlaylistDetailPage;
