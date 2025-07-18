import { useEffect, useState } from "react";
import type { User, Track, Playlist } from "../../interfaces";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import Toaster from "../../components/shared/Toaster";
import PlaylistCard from "../../components/shared/PlaylistCard";
import TrackCard from "../../components/shared/TrackCard";
import { useNavigate } from "react-router-dom";
import { validatePassword } from "../../utils/validatePassword";

const mockTracks: Track[] = [];
const mockPlaylists: Playlist[] = [];
const mockFavourites: Track[] = [];

interface ProfilePageProps {
	currentUser: User | null;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ currentUser }) => {
	const navigate = useNavigate();
	useEffect(() => {
		if (!currentUser) {
			navigate(-1);
		}
	}, [currentUser, navigate]);
	console.log(currentUser);

	const [tracks] = useState<Track[]>(mockTracks);
	const [playlists] = useState<Playlist[]>(mockPlaylists);
	const [favourites] = useState<Track[]>(mockFavourites);

	const [displayName, setDisplayName] = useState(currentUser?.displayName);
	const [password, setPassword] = useState("");
	const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
	const [loading, setLoading] = useState(false);

	const handleUpdate = (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		const passwordError = validatePassword(password);
		if (passwordError) {
			setTimeout(() => {
				setToast({ message: passwordError, type: "error" });
				setLoading(false);
			}, 1000);
			return;
		}

		setTimeout(() => {
			// TODO: Implement API call
			setToast({ message: "Profile updated!", type: "success" });
			setLoading(false);
		}, 1000);
	};

	return (
		<div className="max-w-6xl mx-auto py-8">
			{toast && <Toaster message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
			<h1 className="text-3xl font-bold mb-6">My Profile</h1>
			<form className="mb-8 flex flex-col gap-4" onSubmit={handleUpdate}>
				<div>
					<label className="block font-semibold mb-1">Email</label>
					<input className="w-full px-3 py-2 border rounded hover:cursor-not-allowed" value={currentUser?.email} disabled />
				</div>
				<div>
					<label className="block font-semibold mb-1">Display Name</label>
					<input className="w-full px-3 py-2 border rounded" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
				</div>
				<div>
					<label className="block font-semibold mb-1">Change Password</label>
					<input type="password" className="w-full px-3 py-2 border rounded" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New password" />
				</div>
				<button type="submit" className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition" disabled={loading}>
					{loading ? <LoadingSpinner text="Saving..." /> : "Save Changes"}
				</button>
			</form>

			<div className="mb-8">
				<h2 className="text-2xl font-semibold mb-4">My Tracks</h2>
				{tracks.length === 0 ? (
					<p className="text-gray-500">No tracks uploaded yet.</p>
				) : (
					<ul className="space-y-2">
						{tracks.map((track) => (
							<li key={track.id} className="border p-3 rounded">
								{track.title}
							</li>
						))}
					</ul>
				)}
			</div>

			<div className="mb-8">
				<h2 className="text-2xl font-semibold mb-4">My Playlists</h2>
				{playlists.length === 0 ? (
					<p className="text-gray-500">No playlists created yet.</p>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{playlists.map((playlist) => (
							<PlaylistCard key={playlist.id} playlist={playlist} onClick={() => {}} />
						))}
					</div>
				)}
			</div>

			<div>
				<h2 className="text-2xl font-semibold mb-4">Favourite Tracks</h2>
				{favourites.length === 0 ? (
					<p className="text-gray-500">No favourite tracks yet.</p>
				) : (
					<ul className="space-y-2">
						{favourites.map((track) => (
							<TrackCard key={track.id} track={track} />
						))}
					</ul>
				)}
			</div>
		</div>
	);
};

export default ProfilePage;
