import { useNavigate } from "react-router-dom";
import { CirclePlus } from "lucide-react";
import { useUserPlaylists } from "../../hooks/useUserPlaylists";

import PlaylistCard from "../../components/shared/PlaylistCard";
import CreatePlaylistModal from "./CreatePlayListModal";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import Toaster from "../../components/shared/Toaster";

import type { Playlist, User } from "../../interfaces";
import { useEffect, useState } from "react";
import type { ToasterProps } from "../../interfaces/Toaster";

interface MyPlaylistPageProps {
	currentUser: User | null;
}

const MyPlaylistPage: React.FC<MyPlaylistPageProps> = ({ currentUser }) => {
	const navigate = useNavigate();

	const { playlists, loading, error, refetch, setError } = useUserPlaylists(currentUser?.id || null);
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
	const [toast, setToast] = useState<ToasterProps | null>(null);

	useEffect(() => {
		if (!currentUser) {
			navigate(-1);
		}
	}, [currentUser]);

	useEffect(() => {
		if (error) {
			setToast(error);
			setError(null);
		}
	}, [error]);

	const handlePlaylistCreated = async () => {
		await refetch();
		setToast({ message: "Playlist created successfully!", type: "success" });
	};

	const handlePlaylistCreateFail = ({ message }: { message?: string }) => {
		setToast({ message: message || "Failed to create playlist", type: "error" });
	};

	return (
		<div className="max-w-6xl mx-auto py-8">
			{toast && <Toaster message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
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
					{playlists.map((playlist: Playlist) => (
						<PlaylistCard key={playlist.id} playlist={playlist} onClick={() => navigate(`/playlists/${playlist.id}`)} />
					))}
				</div>
			)}

			<CreatePlaylistModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} onPlaylistCreated={handlePlaylistCreated} onCreateFailed={handlePlaylistCreateFail} />
		</div>
	);
};

export default MyPlaylistPage;
