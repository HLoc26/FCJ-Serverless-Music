import type { User } from "../../../interfaces";

import { Settings, LogOut, Music, CircleQuestionMark, LogIn } from "lucide-react";

import SearchBar from "./SearchBar";
import NavButton from "../../shared/NavButton";

interface HeaderProps {
	currentUser: User | null;
	onSearch: (query: string) => void;
}

// Header Component
const Header: React.FC<HeaderProps> = ({ currentUser, onSearch }) => {
	console.log(currentUser);
	return (
		<header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 px-6 py-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-4">
					<div className="flex items-center gap-2">
						<Music className="w-8 h-8 text-blue-600" />
						<h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">SoundStream</h1>
					</div>
					<div className="ml-8">
						<SearchBar onSearch={onSearch} />
					</div>
				</div>

				<div className="flex items-center gap-3">
					<NavButton icon={<Settings className="w-5 h-5" />} label="Settings" to="/setting" />
					<NavButton icon={<CircleQuestionMark className="w-5 h-5" />} label="About" to="/about" />
					{currentUser?.token ? (
						<NavButton icon={<LogOut className="w-5 h-5" />} label="Logout" to="/logout" />
					) : (
						<NavButton icon={<LogIn className="w-5 h-5" />} label="Login" to="/login" />
					)}
				</div>
			</div>
		</header>
	);
};

export default Header;
