import type { User } from "../../../interfaces";

import { Settings, LogOut, Music, CircleQuestionMark, LogIn } from "lucide-react";

import NavButton from "../../shared/NavButton";
import * as Auth from "aws-amplify/auth";
import { useEffect, memo } from "react";
import { useNavigate } from "react-router-dom";
import type { ActiveTab } from "../../../types/ActiveTab.t";
interface HeaderProps {
	currentUser: User | null;
	setActiveTab: React.Dispatch<React.SetStateAction<ActiveTab>>;
}

// Header Component
const Header: React.FC<HeaderProps> = ({ currentUser, setActiveTab }) => {
	const navigate = useNavigate();
	useEffect(() => {
		const f = async () => {
			const token = await Auth.fetchAuthSession();
			console.log("Use the following as Bearer Token in Postman", token.tokens?.idToken?.toString());
		};
		f();
	}, [currentUser]);

	return (
		<header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 px-6 py-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-4">
					<div className="flex items-center gap-2">
						<Music className="w-8 h-8 text-blue-600" />
						<h1
							className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:cursor-pointer"
							onClick={() => {
								setActiveTab("home");
								navigate("/");
							}}
						>
							First Cloud Stream
						</h1>
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

export default memo(Header);
