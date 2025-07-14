import { useState } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
	placeholder?: string;
	onSearch?: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = "Search tracks, users...", onSearch }) => {
	const [query, setQuery] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSearch?.(query);
	};

	return (
		<form onSubmit={handleSubmit} className="relative">
			<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
			<input
				type="text"
				placeholder={placeholder}
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				className="pl-10 pr-4 py-2 w-80 bg-gray-100 dark:bg-gray-700 border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
		</form>
	);
};

export default SearchBar;
