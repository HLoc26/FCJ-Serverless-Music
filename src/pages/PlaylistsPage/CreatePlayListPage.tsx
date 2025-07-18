import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User, Track } from "../../interfaces";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import Toaster from "../../components/shared/Toaster";
import TrackCard from "../../components/shared/TrackCard";

// Mock tracks for selection (in a real app, this would come from an API)
const mockAvailableTracks: Track[] = [
	{ id: "1", title: "Sample Track 1", duration: 180, uploadedBy: "user1", url: "https://example.com/track1.mp3", createdAt: new Date().toISOString() },
	{ id: "2", title: "Sample Track 2", duration: 240, uploadedBy: "user2", url: "https://example.com/track2.mp3", createdAt: new Date().toISOString() },
	{ id: "3", title: "Sample Track 3", duration: 200, uploadedBy: "user1", url: "https://example.com/track3.mp3", createdAt: new Date().toISOString() },
];

interface CreatePlaylistPageProps {
	currentUser: User | null;
}

const CreatePlaylistPage: React.FC<CreatePlaylistPageProps> = ({ currentUser }) => {
	const navigate = useNavigate();
	const [name, setName] = useState("");
	const [selectedTracks, setSelectedTracks] = useState<Track[]>([]);
	const [availableTracks] = useState<Track[]>(mockAvailableTracks);
	const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
	const [loading, setLoading] = useState(false);

	const handleAddTrack = (track: Track) => {
		if (!selectedTracks.find((t) => t.id === track.id)) {
			setSelectedTracks([...selectedTracks, track]);
		}
	};

	const handleRemoveTrack = (trackId: string) => {
		setSelectedTracks(selectedTracks.filter((t) => t.id !== trackId));
	};

	const handleCreatePlaylist = async () => {
		if (!currentUser) {
			setToast({ message: "You must be logged in.", type: "error" });
			return;
		}

		if (!name.trim()) {
			setToast({ message: "Please enter a playlist name.", type: "error" });
			return;
		}

		if (selectedTracks.length === 0) {
			setToast({ message: "Please add at least one track to the playlist.", type: "error" });
			return;
		}

		setLoading(true);

		// Simulate API call to create playlist
		setTimeout(() => {
			// TODO: Implement API call to create playlist
			// Step 1: Create playlist record
			const playlistData = {
				id: crypto.randomUUID(), // Generate UUID for playlist
				name,
				created_by: currentUser.id,
				created_at: new Date().toISOString(),
			};

			// Step 2: Create playlist_tracks records
			const playlistTracksData = selectedTracks.map((track, index) => ({
				id: crypto.randomUUID(), // Generate UUID for each playlist_track record
				playlist_id: playlistData.id,
				track_id: track.id,
				order: index + 1, // Track order in playlist (1-based)
				added_at: new Date().toISOString(),
			}));

			console.log("Creating playlist with data:", playlistData);
			console.log("Creating playlist_tracks with data:", playlistTracksData);

			// In a real implementation, you would:
			// 1. POST to /api/playlists to create the playlist
			// 2. POST to /api/playlist-tracks (or handle in the same API call) to add tracks
			// 3. Handle any database errors (foreign key violations, etc.)

			setToast({ message: "Playlist created successfully!", type: "success" });
			setLoading(false);

			setTimeout(() => {
				navigate("/profile"); // Navigate back to profile or playlists page
			}, 1000);
		}, 1000);
	};

	return (
		<div className="max-w-4xl mx-auto py-8 px-4 bg-gray-900 min-h-screen">
			{toast && <Toaster message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

			<h1 className="text-3xl font-bold mb-6 text-white">Create New Playlist</h1>

			<div className="flex flex-col gap-6">
				{/* Playlist Details */}
				<div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
					<h2 className="text-xl font-semibold mb-4 text-white">Playlist Details</h2>

					<div className="flex flex-col gap-4">
						<div>
							<label className="block font-semibold mb-2 text-white">Name *</label>
							<input
								type="text"
								className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder="Enter playlist name"
							/>
						</div>
					</div>
				</div>

				{/* Available Tracks */}
				<div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
					<h2 className="text-xl font-semibold mb-4 text-white">Available Tracks</h2>

					{availableTracks.length === 0 ? (
						<p className="text-gray-400">No tracks available to add.</p>
					) : (
						<div className="space-y-2">
							{availableTracks.map((track) => (
								<div key={track.id} className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
									<div className="flex-1">
										<TrackCard track={track} />
									</div>
									<button
										onClick={() => handleAddTrack(track)}
										disabled={selectedTracks.some((t) => t.id === track.id)}
										className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
									>
										{selectedTracks.some((t) => t.id === track.id) ? "Added" : "Add"}
									</button>
								</div>
							))}
						</div>
					)}
				</div>

				{/* Selected Tracks */}
				<div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
					<h2 className="text-xl font-semibold mb-4 text-white">Selected Tracks ({selectedTracks.length})</h2>

					{selectedTracks.length === 0 ? (
						<p className="text-gray-400">No tracks selected yet.</p>
					) : (
						<div className="space-y-2">
							{selectedTracks.map((track, index) => (
								<div key={track.id} className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
									<div className="flex items-center gap-3">
										<span className="text-gray-400 font-semibold">{index + 1}.</span>
										<div className="flex-1">
											<TrackCard track={track} />
										</div>
									</div>
									<button onClick={() => handleRemoveTrack(track.id)} className="ml-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
										Remove
									</button>
								</div>
							))}
						</div>
					)}
				</div>

				{/* Create Button */}
				<button
					type="button"
					onClick={handleCreatePlaylist}
					className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
					disabled={loading}
				>
					{loading ? <LoadingSpinner text="Creating..." /> : "Create Playlist"}
				</button>
			</div>
		</div>
	);
};

export default CreatePlaylistPage;
