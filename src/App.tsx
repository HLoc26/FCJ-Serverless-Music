import "./App.css";
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./components/layouts/MainLayout/MainLayout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LogInPage from "./pages/LogInPage";
import RegisterPage from "./pages/RegisterPage";
import ConfirmSignupPage from "./pages/ConfirmSignup";
import LandingPage from "./pages/LandingPage";
import LogOutPage from "./pages/LogOutPage";
import { useAuthUser } from "./hooks/useAuthUser";

const App: React.FC = () => {
	const { currentUser, setCurrentUser, isAuthenticated, setIsAuthenticated } = useAuthUser();

	return (
		<Routes>
			<Route path="/" element={<MainLayout currentUser={currentUser} />}>
				<Route index element={<HomePage currentUser={currentUser} />} />
			</Route>
			<Route path="landing" element={<LandingPage />} />
			<Route path="about" element={<AboutPage />} />
			<Route path="login" element={isAuthenticated ? <Navigate to="/" replace /> : <LogInPage setCurrentUser={setCurrentUser} setIsAuthenticated={setIsAuthenticated} />} />
			<Route path="register" element={isAuthenticated ? <Navigate to="/" replace /> : <RegisterPage />} />
			<Route path="register/confirm" element={isAuthenticated ? <Navigate to="/" replace /> : <ConfirmSignupPage />} />
			<Route path="logout" element={<LogOutPage setCurrentUser={setCurrentUser} setIsAuthenticated={setIsAuthenticated} />} />
		</Routes>
	);
};

export default App;

