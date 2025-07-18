import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Toaster, { type ToasterType } from "../../components/shared/Toaster";
import * as Auth from "aws-amplify/auth";

const ConfirmSignupPage: React.FC = () => {
	const [otp, setOtp] = useState("");
	const [toast, setToast] = useState<{ message: string; type: ToasterType } | null>(null);
	const [redirect, setRedirect] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();

	const state = location.state as { email: string };
	const email = state?.email;

	useEffect(() => {
		if (typeof email == "undefined") {
			navigate("/register");
			return;
		}
	}, [email, navigate]);

	useEffect(() => {
		if (redirect) {
			navigate("/login");
		}
	}, [redirect, navigate]);

	const handleConfirm = useCallback(
		async (e: React.FormEvent) => {
			e.preventDefault();
			try {
				await Auth.confirmSignUp({
					username: email,
					confirmationCode: otp,
				});
				setToast({ message: "Signup confirmed! Redirecting...", type: "success" });
				setTimeout(() => setRedirect(true), 2000);
			} catch (error: any) {
				setToast({ message: error.message || "Confirmation failed!", type: "error" });
			}
		},
		[otp, email]
	);

	return (
		<div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
			{toast && (
				<Toaster
					message={toast.message}
					type={toast.type}
					onClose={() => {
						setToast(null);
						if (toast.type === "success") setRedirect(true);
					}}
				/>
			)}
			<h1 className="mb-8 text-3xl font-bold text-gray-800">Confirm Signup</h1>
			<form className="flex flex-col gap-4 w-80" onSubmit={handleConfirm}>
				<div>
					<label htmlFor="otp" className="block mb-2 font-semibold text-gray-700">
						OTP Code
					</label>
					<input
						type="text"
						id="otp"
						value={otp}
						onChange={(e) => setOtp(e.target.value)}
						className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
						required
					/>
				</div>
				<button type="submit" className="w-full py-3 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition">
					Confirm
				</button>
			</form>
		</div>
	);
};

export default ConfirmSignupPage;
