import { User as UserIcon, Music, Users } from "lucide-react";

import type { User } from "../../../interfaces";

import NavButton from "../../shared/NavButton";
import FavoriteUserCard from "./FavouriteUserCard";

interface SidebarProps {
	favoriteUsers: User[];
	onUserClick: (userId: string) => void;
}
// Sidebar Component
const Sidebar: React.FC<SidebarProps> = ({ favoriteUsers, onUserClick }) => (
	<aside className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-6">
		<nav className="space-y-2">
			<div className="mb-6">
				<h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Navigation</h2>
				<div className="space-y-1">
					<NavButton
						icon={<UserIcon className="w-5 h-5" />}
						label="My Profile"
						to="/profile"
						// isActive={activeSection === "profile"}
					/>
					<NavButton
						icon={<Music className="w-5 h-5" />}
						label="My Playlists"
						to="/my-playlist"
						// isActive={activeSection === "playlists"}
					/>
				</div>
			</div>

			<div>
				<h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Favorite Users</h2>
				<div className="space-y-2">
					{favoriteUsers.map((user) => (
						<FavoriteUserCard key={user.id} user={user} onClick={() => onUserClick(user.id)} />
					))}
					<NavButton icon={<Users className="w-5 h-5" />} to="/users" label="Discover Users" />
				</div>
			</div>
		</nav>
	</aside>
);

export default Sidebar;
