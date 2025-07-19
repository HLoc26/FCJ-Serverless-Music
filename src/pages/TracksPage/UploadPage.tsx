import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "../../interfaces";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import Toaster from "../../components/shared/Toaster";
import { useUploadTrack } from "../../hooks/useUploadTrack";
import FileDropZone from "../../components/shared/FileDropZone";
import { getAudioDuration } from "../../utils/trackProcessing";

interface UploadPageProps {
	currentUser: User | null;
}

interface UploadPageProps {
	currentUser: User | null;
}

const UploadPage: React.FC<UploadPageProps> = ({ currentUser }) => {
	const navigate = useNavigate();
	const [title, setTitle] = useState("");
	const [duration, setDuration] = useState(0);
	const [file, setFile] = useState<File | null>(null);
	const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

	const { uploadTrack, loading, error } = useUploadTrack();

	const handleFileSelect = async (selectedFile: File) => {
		setFile(selectedFile);

		const fileDuration = await getAudioDuration(selectedFile);

		setDuration(fileDuration);
	};

	const handleFileRemove = () => {
		setFile(null);
		setDuration(0);
	};

	const handleUpload = async () => {
		if (!currentUser) {
			setToast({ message: "You must be logged in.", type: "error" });
			return;
		}
		if (!title || !duration || !file) {
			setToast({ message: "Please fill in all fields.", type: "error" });
			return;
		}

		const result = await uploadTrack({ title, duration, file });

		if (result) {
			setToast({ message: "Track uploaded successfully!", type: "success" });
			setTimeout(() => {
				navigate("/my-tracks");
				console.log("Navigate to my-tracks");
			}, 1000);
		} else if (error) {
			setToast({ message: error, type: "error" });
		}
	};

	return (
		<div className="max-w-2xl mx-auto py-8 px-4 bg-gray-900 min-h-screen">
			{toast && <Toaster message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

			<h1 className="text-3xl font-bold mb-6 text-white">Upload New Track</h1>

			<div className="flex flex-col gap-6">
				<div>
					<label className="block font-semibold mb-2 text-white">Title *</label>
					<input
						type="text"
						className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder="Enter track title"
					/>
				</div>

				<div>
					<label className="block font-semibold mb-2 text-white">Duration (seconds) *</label>
					<input
						disabled
						type="number"
						className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 hover:cursor-not-allowed"
						value={duration}
					/>
				</div>

				<div>
					<label className="block font-semibold mb-2 text-white">Audio File *</label>
					<FileDropZone onFileSelect={handleFileSelect} selectedFile={file} onFileRemove={handleFileRemove} />
				</div>

				<button
					type="button"
					onClick={handleUpload}
					className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
					disabled={loading}
				>
					{loading ? <LoadingSpinner text="Uploading..." /> : "Upload Track"}
				</button>
			</div>
		</div>
	);
};

export default UploadPage;
