import type { User } from "../../../interfaces";
import UserAvatar from "../Header/UserAvatar";

interface FavoriteUserCardProps {
	user: User;
	onClick: () => void;
}
// Favorite User Card Component
const FavoriteUserCard: React.FC<FavoriteUserCardProps> = ({ user, onClick }) => (
	<button onClick={onClick} className="flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 text-left">
		<UserAvatar user={user} size="sm" />
		<span className="font-medium text-gray-700 dark:text-gray-300">{user.name}</span>
	</button>
);

export default FavoriteUserCard;
