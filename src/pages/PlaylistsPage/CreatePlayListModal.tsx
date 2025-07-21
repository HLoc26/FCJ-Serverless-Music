import { useState } from "react";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import { X } from "lucide-react";
import { useCreatePlaylist } from "../../hooks/useCreatePlaylist";

interface CreatePlaylistModalProps {
	isOpen: boolean;
	onClose: () => void;
	onPlaylistCreated: () => void;
	onCreateFailed: ({ message }: { message?: string }) => void;
}

const CreatePlaylistModal: React.FC<CreatePlaylistModalProps> = ({ isOpen, onClose, onPlaylistCreated, onCreateFailed }) => {
	const [name, setName] = useState("");
	const { createNewPlaylist, loading } = useCreatePlaylist();

	const handleCreatePlaylist = async () => {
		if (!name.trim()) {
			onCreateFailed({ message: "Please enter a playlist name." });
			return;
		}

		const success = await createNewPlaylist(name);
		if (success) {
			setName("");
			onPlaylistCreated();
			onClose();
		} else {
			onCreateFailed({ message: "Failed to create playlist." });
		}
	};

	const handleClose = () => {
		setName("");
		onClose();
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-49 p-4">
			<div className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
				<div className="flex justify-between items-center p-6 border-b border-gray-700">
					<h2 className="text-2xl font-bold text-white">Create New Playlist</h2>
					<button onClick={handleClose} className="text-gray-400 hover:text-white transition-colors">
						<X size={24} />
					</button>
				</div>

				<div className="p-6 space-y-6">
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

					<div className="flex justify-end gap-3 p-6 border-t border-gray-700">
						<button onClick={handleClose} className="px-6 py-2 text-gray-400 hover:text-white transition-colors">
							Cancel
						</button>
						<button
							onClick={handleCreatePlaylist}
							disabled={loading}
							className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
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
