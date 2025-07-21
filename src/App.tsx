import "./App.css";
import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./components/layouts/MainLayout/MainLayout";
import HomePage from "./pages/HomePage/HomePage";
import AboutPage from "./pages/AboutPage/AboutPage";
import LogInPage from "./pages/LoginPage/LogInPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ConfirmSignupPage from "./pages/RegisterPage/ConfirmSignup";
import LandingPage from "./pages/LandingPage/LandingPage";
import LogOutPage from "./pages/LoginPage/LogOutPage";
import { useAuthUser } from "./hooks/useAuthUser";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import MyPlaylistPage from "./pages/PlaylistsPage/MyPlaylistsPage";
import MyTracksPage from "./pages/TracksPage/MyTracksPage";
import UploadPage from "./pages/TracksPage/UploadPage";
import type { ActiveTab } from "./types/ActiveTab.t";
import PlaylistDetailPage from "./pages/PlaylistsPage/PlaylistDetailPage";

const App: React.FC = () => {
	const { currentUser, setCurrentUser, isAuthenticated, setIsAuthenticated } = useAuthUser();
	const [activeTab, setActiveTab] = useState<ActiveTab>("home");

	return (
		<Routes>
			<Route path="/" element={<MainLayout activeTab={activeTab} currentUser={currentUser} onChangeTab={setActiveTab} />}>
				<Route index element={<HomePage currentUser={currentUser} />} />
				<Route path="profile" element={<ProfilePage currentUser={currentUser} />} />
				<Route path="my-playlists" element={<MyPlaylistPage currentUser={currentUser} />} />
				<Route path="my-tracks" element={<MyTracksPage currentUser={currentUser} />} />
				<Route path="my-tracks/upload" element={<UploadPage currentUser={currentUser} />} />

				<Route path="playlists/:id" element={<PlaylistDetailPage currentUser={currentUser} />} />
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

