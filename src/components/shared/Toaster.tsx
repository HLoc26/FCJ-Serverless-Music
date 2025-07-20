import React, { useEffect, useRef, useState } from "react";
import type { ToasterProps } from "../../interfaces/Toaster";

const Toaster: React.FC<ToasterProps> = ({ message, type, duration = 2000, onClose }) => {
	const [progress, setProgress] = useState(100);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		const start = Date.now();
		intervalRef.current = setInterval(() => {
			const elapsed = Date.now() - start;
			const percent = Math.max(0, 100 - (elapsed / duration) * 100);
			setProgress(percent);
			if (percent === 0 && onClose) {
				onClose();
			}
		}, 30);

		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current);
		};
	}, [duration, onClose]);

	return (
		<div
			className={`fixed top-6 right-6 z-50 px-6 py-3 rounded shadow-lg text-white font-semibold flex flex-col items-start transition
                ${type === "success" ? "bg-green-600" : "bg-red-600"}`}
		>
			<div className="flex items-center w-full">
				<span>{message}</span>
				{onClose && (
					<button className="ml-4 text-white font-bold" onClick={onClose} aria-label="Close">
						×
					</button>
				)}
			</div>
			<div className="w-full h-1 mt-2 bg-white/30 rounded overflow-hidden">
				<div className={`h-full ${type === "success" ? "bg-green-300" : "bg-red-300"} transition-all`} style={{ width: `${progress}%` }} />
			</div>
		</div>
	);
};

export default Toaster;
