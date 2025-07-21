import { useEffect } from "react";
import type { User } from "../../interfaces";
import { useNavigate } from "react-router-dom";
import TrackCard from "../../components/shared/TrackCard";
import Toaster from "../../components/shared/Toaster";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import { Upload } from "lucide-react";
import { useUserTracks } from "../../hooks/useUserTracks";

interface MyTrackPageProps {
	currentUser: User | null;
}

const MyTrackPage: React.FC<MyTrackPageProps> = ({ currentUser }) => {
	const navigate = useNavigate();
	const { tracks, loading, toast, setToast } = useUserTracks(currentUser);

	useEffect(() => {
		if (!currentUser) {
			navigate(-1);
		}
	}, [currentUser, navigate]);

	return (
		<div className="max-w-6xl mx-auto py-8">
			{toast && <Toaster message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-3xl font-bold">My Tracks</h1>
				<button onClick={() => navigate("/my-tracks/upload")} className="bg-blue-600 text-white font-semibold px-4 py-2 rounded hover:bg-blue-700 hover:cursor-pointer transition">
					<Upload />
				</button>
			</div>
			{loading ? (
				<LoadingSpinner text="Loading tracks..." />
			) : tracks.length === 0 ? (
				<p className="text-gray-500">You haven't uploaded any tracks yet.</p>
			) : (
				<ul className="space-y-3">
					{tracks.map((track) => (
						<li key={track.id}>
							<TrackCard track={track} />
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default MyTrackPage;
