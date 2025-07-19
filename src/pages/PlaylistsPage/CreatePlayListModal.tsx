import { useState } from "react";
import type { User } from "../../interfaces";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import Toaster from "../../components/shared/Toaster";
import { X } from "lucide-react";

interface CreatePlaylistModalProps {
	currentUser: User | null;
	isOpen: boolean;
	onClose: () => void;
	onPlaylistCreated: () => void; // Callback to refresh playlists
}

const CreatePlaylistModal: React.FC<CreatePlaylistModalProps> = ({ currentUser, isOpen, onClose, onPlaylistCreated }) => {
	const [name, setName] = useState("");
	const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
	const [loading, setLoading] = useState(false);

	const handleCreatePlaylist = async () => {
		if (!currentUser) {
			setToast({ message: "You must be logged in.", type: "error" });
			return;
		}

		if (!name.trim()) {
			setToast({ message: "Please enter a playlist name.", type: "error" });
			return;
		}

		setLoading(true);

		// Simulate API call to create playlist
		setTimeout(() => {
			// TODO: Implement API call to create playlist
			const playlistData = {
				id: crypto.randomUUID(),
				name,
				created_by: currentUser.id,
				created_at: new Date().toISOString(),
			};

			console.log("Creating playlist with data:", playlistData);

			setToast({ message: "Playlist created successfully!", type: "success" });
			setLoading(false);

			setTimeout(() => {
				// Reset form
				setName("");
				// Notify parent to refresh playlists
				onPlaylistCreated();
				// Close modal
				onClose();
			}, 1000);
		}, 1000);
	};

	const handleClose = () => {
		// Reset form when closing
		setName("");
		setToast(null);
		onClose();
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
			<div className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
				{toast && <Toaster message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

				{/* Header */}
				<div className="flex justify-between items-center p-6 border-b border-gray-700">
					<h2 className="text-2xl font-bold text-white">Create New Playlist</h2>
					<button onClick={handleClose} className="text-gray-400 hover:text-white hover:cursor-pointer transition-colors">
						<X size={24} />
					</button>
				</div>

				{/* Content */}
				<div className="p-6 space-y-6">
					{/* Playlist Name */}
					<div>
						<label className="block font-semibold mb-2 text-white">Name *</label>
						<input
							type="text"
							className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="Enter playlist name"
						/>
					</div>

					{/* Footer */}
					<div className="flex justify-end gap-3 p-6 border-t border-gray-700">
						<button onClick={handleClose} className="px-6 py-2 text-gray-400 hover:text-white transition-colors">
							Cancel
						</button>
						<button
							onClick={handleCreatePlaylist}
							disabled={loading}
							className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{loading ? <LoadingSpinner text="Creating..." /> : "Create Playlist"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreatePlaylistModal;
