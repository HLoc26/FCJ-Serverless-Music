// pages/RegisterPage.tsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { StepBackIcon } from "lucide-react";
import Toaster from "../../components/shared/Toaster";
import { useRegister } from "../../hooks/useRegister";
import LoadingSpinner from "../../components/shared/LoadingSpinner";

const RegisterPage: React.FC = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [retypePassword, setRetypePassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const { toast, setToast, register } = useRegister();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		register(email, username, password, retypePassword);
	};

	return (
		<div className="flex flex-col relative top-[10vh] items-center overflow-hidden">
			{toast && <Toaster message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
			<div className="fixed top-0 left-0">
				<button className="flex items-center gap-2 mb-6 px-4 py-2 rounded hover:bg-gray-200 hover:cursor-pointer transition text-gray-700 font-semibold" onClick={() => navigate(-1)}>
					<StepBackIcon className="w-5 h-5" />
					Back
				</button>
			</div>
			<h1 className="mb-8 text-3xl font-bold text-gray-800">Register</h1>
			<form className="flex flex-col gap-4 w-80" onSubmit={handleSubmit}>
				<div>
					<label htmlFor="email" className="block mb-2 font-semibold text-gray-700">
						Email
					</label>
					<input
						type="email"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
						required
					/>
				</div>
				<div>
					<label htmlFor="username" className="block mb-2 font-semibold text-gray-700">
						Username (your display name)
					</label>
					<input
						type="text"
						id="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
						required
					/>
				</div>
				<div>
					<label htmlFor="password" className="block mb-2 font-semibold text-gray-700">
						Password
					</label>
					<input
						type="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
						required
					/>
				</div>
				<div>
					<label htmlFor="retypePassword" className="block mb-2 font-semibold text-gray-700">
						Retype Password
					</label>
					<input
						type="password"
						id="retypePassword"
						value={retypePassword}
						onChange={(e) => setRetypePassword(e.target.value)}
						className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
						required
					/>
				</div>
				<button type="submit" disabled={isLoading ? true : false} className="w-full py-3 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 hover:cursor-pointer transition">
					{isLoading ? <LoadingSpinner text="Register" /> : <>Register</>}
				</button>
			</form>
			<p className="mt-6 text-gray-700">
				Already have an account?{" "}
				<Link to="/login" className="text-blue-600 hover:underline font-semibold">
					Sign in
				</Link>
			</p>
		</div>
	);
};

export default RegisterPage;
