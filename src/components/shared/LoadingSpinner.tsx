// components/shared/LoadingSpinner.tsx
import { Loader2 } from "lucide-react";

const LoadingSpinner = ({ text }: { text: string }) => {
	return (
		<div className="flex justify-center items-center">
			<Loader2 className="animate-spin h-6 w-6 text-blue-500" />
			<span className="ml-2 text-gray-600 dark:text-gray-300">{text}</span>
		</div>
	);
};

export default LoadingSpinner;
