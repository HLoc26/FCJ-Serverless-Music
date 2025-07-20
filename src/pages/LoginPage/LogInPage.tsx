import { useState, useCallback, type Dispatch, type SetStateAction } from "react";
import { StepBackIcon } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import type { User } from "../../interfaces";
import Toaster from "../../components/shared/Toaster";
import useLogin from "../../hooks/useLogin";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import type { ToasterProps } from "../../interfaces/Toaster";

interface LoginPageProps {
	setCurrentUser: Dispatch<SetStateAction<User | null>>;
	setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
}

const LogInPage: React.FC<LoginPageProps> = ({ setCurrentUser, setIsAuthenticated }) => {
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [toast, setToast] = useState<ToasterProps | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const [login] = useLogin();

	const loginHandler = useCallback(
		async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
			setIsLoading(true);
			e.preventDefault();

			console.log(email, password);

			try {
				const { currentUser, success, message } = await login({ email, password });

				if (success) {
					setIsLoading(false);
					setIsAuthenticated(true);
					setCurrentUser(currentUser);
					// TODO: Connect to RDS to get user info
					setToast({ message: message, type: "success" });
				} else {
					throw new Error(message);
				}
			} catch (error: any) {
				setToast({ message: error.message || "Login failed!", type: "error" });
			} finally {
				setIsLoading(false);
			}
		},
		[email, password, setCurrentUser, setIsAuthenticated, login]
	);

	return (
		<div className="flex flex-col relative top-[10vh] items-center">
			{toast && <Toaster message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
			<div className="fixed top-0 left-0">
				<button className="flex items-center gap-2 mb-6 px-4 py-2 rounded hover:bg-gray-200 hover:cursor-pointer transition text-gray-700 font-semibold" onClick={() => navigate(-1)}>
					<StepBackIcon className="w-5 h-5" />
					Back
				</button>
			</div>
			<h1 className="mb-8 text-3xl font-bold text-gray-800 ">Login</h1>
			<form className="flex flex-col gap-4 w-80">
				<div className="mb-4 w-80">
					<label htmlFor="username" className="block mb-2 font-semibold text-gray-700">
						Username
					</label>
					<input
						type="text"
						id="username"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
					/>
				</div>
				<div className="mb-6 w-80">
					<label htmlFor="password" className="block mb-2 font-semibold text-gray-700">
						Password
					</label>
					<input
						type="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
					/>
				</div>
				<button
					type="submit"
					disabled={isLoading ? true : false}
					onClick={(e) => loginHandler(e)}
					className="w-80 py-3 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 hover:cursor-pointer transition"
				>
					{isLoading ? <LoadingSpinner text="Login" /> : <>Login</>}
				</button>
			</form>
			<p className="mt-6 text-gray-700">
				Do not have an account?{" "}
				<Link to="/register" className="text-blue-600 hover:underline font-semibold">
					Sign up
				</Link>
			</p>
		</div>
	);
};
export default LogInPage;
