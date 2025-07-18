import { Link } from "react-router-dom";

const LandingPage: React.FC = () => {
	return (
		<div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 to-blue-300">
			<h1 className="text-5xl font-extrabold text-blue-700 mb-6">Welcome to FCJ Serverless Music</h1>
			<p className="text-lg text-gray-700 mb-8 text-center max-w-xl">Discover, listen, and share your favorite music. Sign up to get started or log in if you already have an account!</p>
			<div className="flex gap-4">
				<Link to="/login" className="px-6 py-3 bg-blue-600 text-white rounded font-bold hover:bg-blue-700 transition">
					Login
				</Link>
				<Link to="/register" className="px-6 py-3 bg-white border border-blue-600 text-blue-600 rounded font-bold hover:bg-blue-50 transition">
					Register
				</Link>
				<Link to="/" className="px-6 py-3 bg-white border border-blue-600 text-blue-600 rounded font-bold hover:bg-blue-50 transition">
					Try
				</Link>
			</div>
		</div>
	);
};

export default LandingPage;
