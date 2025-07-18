import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Auth from "aws-amplify/auth";
import type { Dispatch, SetStateAction } from "react";
import type { User } from "../../interfaces";
import LoadingSpinner from "../../components/shared/LoadingSpinner";

interface LogOutProps {
	setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
	setCurrentUser: Dispatch<SetStateAction<User | null>>;
}

const LogOutPage: React.FC<LogOutProps> = ({ setIsAuthenticated, setCurrentUser }) => {
	const navigate = useNavigate();

	useEffect(() => {
		const logout = async () => {
			try {
				await Auth.signOut();
			} catch (error) {
				console.error(error);
			}
			setIsAuthenticated(false);
			setCurrentUser(null);
			localStorage.removeItem("currentUser");
			navigate("/landing", { replace: true });
		};
		logout();
	}, [setIsAuthenticated, setCurrentUser, navigate]);

	return (
		<div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
			<LoadingSpinner text="Logging out..." />
		</div>
	);
};

export default LogOutPage;
