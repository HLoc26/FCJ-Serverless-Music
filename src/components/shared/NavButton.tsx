import { useNavigate } from "react-router-dom";

// Define a more flexible type for state to allow any valid state object
type NavigateState = Record<string, unknown> | null | undefined;

interface NavButtonProps {
	icon: React.ReactNode;
	label: string;
	to: string;
	state?: NavigateState; // Use the defined type
	isActive?: boolean;
	className?: string;
}

const NavButton: React.FC<NavButtonProps> = ({ icon, label, to, state, isActive = false }) => {
	const navigate = useNavigate();

	// console.log(label, isActive);

	return (
		<button
			onClick={() => navigate(to, { state })} // Fix: use `state` instead of `data`
			className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 
				hover:bg-blue-50 hover:dark:bg-blue-900/20 hover:text-blue-600 hover:dark:text-blue-400 hover:cursor-pointer 
				${isActive ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" : "text-gray-700 dark:text-gray-300"}`}
		>
			{icon}
			<span className="font-medium">{label}</span>
		</button>
	);
};

export default NavButton;
