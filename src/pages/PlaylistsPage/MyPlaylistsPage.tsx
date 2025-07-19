import { useEffect, useState } from "react";
import type { Playlist, User } from "../../interfaces";
import PlaylistCard from "../../components/shared/PlaylistCard";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import { CirclePlus } from "lucide-react";
import CreatePlaylistModal from "./CreatePlayListModal";

interface MyPlaylistPageProps {
	currentUser: User | null;
}

const mockPlaylists: Playlist[] = [
	// Thêm data mẫu nếu cần
];

const MyPlaylistPage: React.FC<MyPlaylistPageProps> = ({ currentUser }) => {
	const navigate = useNavigate();

	const [playlists, setPlaylists] = useState<Playlist[]>([]);
	const [loading, setLoading] = useState(true);
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

	useEffect(() => {
		if (!currentUser) {
			navigate(-1);
			return;
		}

		// Giả lập fetch playlist
		setTimeout(() => {
			// TODO: Thay bằng API thật, ví dụ: getUserPlaylists(currentUser.id)
			setPlaylists(mockPlaylists);
			setLoading(false);
		}, 800);
	}, [currentUser, navigate]);

	const fetchPlaylists = () => {
		setLoading(true);
		// Giả lập fetch playlist
		setTimeout(() => {
			// TODO: Thay bằng API thật, ví dụ: getUserPlaylists(currentUser.id)
			setPlaylists(mockPlaylists);
			setLoading(false);
		}, 800);
	};

	const handlePlaylistCreated = () => {
		// Refresh playlists after creating a new one
		fetchPlaylists();
	};

	return (
		<div className="max-w-6xl mx-auto py-8">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-3xl font-bold">My Playlists</h1>
				<button
					onClick={() => setIsCreateModalOpen(true)}
					className="bg-blue-600 text-white font-semibold px-4 py-2 rounded hover:bg-blue-700 hover:cursor-pointer transition flex items-center gap-2"
				>
					<CirclePlus size={20} />
					Create Playlist
				</button>
			</div>

			{loading ? (
				<LoadingSpinner text="Loading playlists..." />
			) : playlists.length === 0 ? (
				<div className="text-center py-12">
					<p className="text-gray-500 mb-4">You haven't created any playlists yet.</p>
					<button onClick={() => setIsCreateModalOpen(true)} className="bg-blue-600 text-white font-semibold px-6 py-3 rounded hover:bg-blue-700 transition">
						Create Your First Playlist
					</button>
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{playlists.map((playlist) => (
						<PlaylistCard
							key={playlist.id}
							playlist={playlist}
							onClick={() => {
								// TODO: chuyển đến trang chi tiết playlist nếu có
								navigate(`/playlists/${playlist.id}`);
							}}
						/>
					))}
				</div>
			)}

			{/* Create Playlist Modal */}
			<CreatePlaylistModal currentUser={currentUser} isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} onPlaylistCreated={handlePlaylistCreated} />
		</div>
	);
};

export default MyPlaylistPage;
