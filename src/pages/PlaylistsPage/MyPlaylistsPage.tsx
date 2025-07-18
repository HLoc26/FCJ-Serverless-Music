import { useEffect, useState } from "react";
import type { Playlist, User } from "../../interfaces";
import PlaylistCard from "../../components/shared/PlaylistCard";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import { CirclePlus } from "lucide-react";

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

	return (
		<div className="max-w-6xl mx-auto py-8">
			{/* {toast && <Toaster message={toast.message} type={toast.type} onClose={() => setToast(null)} />} */}
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-3xl font-bold mb-6">My Playlists</h1>
				<button onClick={() => navigate("/my-playlists/create")} className="bg-blue-600 text-white font-semibold px-4 py-2 rounded hover:bg-blue-700 hover:cursor-pointer transition">
					<CirclePlus />
				</button>
			</div>
			{loading ? (
				<LoadingSpinner text="Loading playlists..." />
			) : playlists.length === 0 ? (
				<p className="text-gray-500">You haven't created any playlists yet.</p>
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
		</div>
	);
};

export default MyPlaylistPage;
