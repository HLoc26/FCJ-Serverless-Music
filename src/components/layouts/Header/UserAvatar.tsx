// interface UserAvatarProps {
// 	user: User;
// 	size?: "sm" | "md" | "lg";
// }
// User Avatar Component
const UserAvatar: React.FC = ({ user, size = "md" }) => {
	const sizeClasses = {
		sm: "w-8 h-8",
		md: "w-10 h-10",
		lg: "w-12 h-12",
	};

	if (user.profile) {
		console.log(user.profile.picture);
	}

	return (
		<>
			{user.profile ? ( //
				<img src={user.profile.picture} srcSet={user.profile.picture} alt={user.profile.preferred_username} className={`${sizeClasses[size]} rounded-full object-cover`} />
			) : (
				<span>user</span>
			)}
		</>
	);
	// return <>A</>;
};

export default UserAvatar;
