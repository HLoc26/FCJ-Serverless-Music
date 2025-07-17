import React, { useState, useRef, useCallback } from "react";
import { Upload, Music, X } from "lucide-react";

interface FileDropZoneProps {
	onFileSelect: (file: File) => void;
	selectedFile: File | null;
	onFileRemove: () => void;
}

const FileDropZone: React.FC<FileDropZoneProps> = ({ onFileSelect, selectedFile, onFileRemove }) => {
	const [isDragOver, setIsDragOver] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleDragOver = useCallback((e: React.DragEvent) => {
		e.preventDefault();
		setIsDragOver(true);
	}, []);

	const handleDragLeave = useCallback((e: React.DragEvent) => {
		e.preventDefault();
		setIsDragOver(false);
	}, []);

	const handleDrop = useCallback(
		(e: React.DragEvent) => {
			e.preventDefault();
			setIsDragOver(false);

			const files = e.dataTransfer.files;
			if (files && files.length > 0) {
				const file = files[0];
				if (file.type.startsWith("audio/")) {
					onFileSelect(file);
				}
			}
		},
		[onFileSelect]
	);

	const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			onFileSelect(file);
		}
	};

	const handleClick = () => {
		fileInputRef.current?.click();
	};

	const formatFileSize = (bytes: number) => {
		if (bytes === 0) return "0 Bytes";
		const k = 1024;
		const sizes = ["Bytes", "KB", "MB", "GB"];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
	};

	if (selectedFile) {
		return (
			<div className="bg-gray-800 border-2 border-gray-600 rounded-lg p-6">
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-4">
						<div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
							<Music className="w-6 h-6 text-white" />
						</div>
						<div>
							<p className="text-white font-medium">{selectedFile.name}</p>
							<p className="text-gray-400 text-sm">{formatFileSize(selectedFile.size)}</p>
						</div>
					</div>
					<button onClick={onFileRemove} className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 hover:cursor-pointer transition-colors">
						<X className="w-4 h-4 text-white" />
					</button>
				</div>
			</div>
		);
	}

	return (
		<div
			className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
				isDragOver ? "border-blue-500 bg-blue-500/10" : "border-gray-600 bg-gray-800 hover:border-gray-500 hover:bg-gray-700"
			}`}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			onDrop={handleDrop}
			onClick={handleClick}
		>
			<input ref={fileInputRef} type="file" accept="audio/*" className="hidden" onChange={handleFileInputChange} />

			<div className="flex flex-col items-center space-y-4">
				<div className={`w-16 h-16 rounded-full flex items-center justify-center ${isDragOver ? "bg-blue-500" : "bg-gray-700"}`}>
					<Upload className={`w-8 h-8 ${isDragOver ? "text-white" : "text-gray-400"}`} />
				</div>

				<div>
					<p className={`text-lg font-medium ${isDragOver ? "text-blue-400" : "text-white"}`}>{isDragOver ? "Drop your audio file here" : "Drag & drop your audio file here"}</p>
					<p className="text-gray-400 mt-1">or click to browse</p>
				</div>

				<div className="text-sm text-gray-500">
					<p>Supported formats: MP3, WAV, FLAC, M4A</p>
					<p>Maximum file size: 50MB</p>
				</div>
			</div>
		</div>
	);
};

export default FileDropZone;
