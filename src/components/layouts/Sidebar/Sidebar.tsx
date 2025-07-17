import { User as UserIcon, Music } from "lucide-react";

import NavButton from "../../shared/NavButton";
import type { ActiveTab } from "../../../types/ActiveTab.t";

interface SidebarProps {
	activeTab: ActiveTab;
	onChangeTab: React.Dispatch<React.SetStateAction<ActiveTab>>;
}
// Sidebar Component
const Sidebar: React.FC<SidebarProps> = ({ activeTab, onChangeTab }) => {
	return (
		<aside className="w-60 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-6">
			<nav className="space-y-2">
				<div className="mb-6">
					<h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Navigation</h2>
					<div className="space-y-1">
						<div onClick={() => onChangeTab("profile")}>
							<NavButton isActive={activeTab == "profile"} icon={<UserIcon className="w-5 h-5" />} label="My Profile" to="/profile" />
						</div>
						<div onClick={() => onChangeTab("playlists")}>
							<NavButton isActive={activeTab == "playlists"} icon={<Music className="w-5 h-5" />} label="My Playlists" to="/my-playlists" />
						</div>
						<div onClick={() => onChangeTab("tracks")}>
							<NavButton isActive={activeTab == "tracks"} icon={<Music className="w-5 h-5" />} label="My Tracks" to="/my-tracks" />
						</div>
					</div>
				</div>
			</nav>
		</aside>
	);
};

export default Sidebar;
