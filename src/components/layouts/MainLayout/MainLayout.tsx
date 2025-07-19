import React from "react";
import { Outlet } from "react-router-dom";

import { Header, Sidebar, MusicPlayerBar } from "../../../components";
import { type User } from "../../../interfaces";
import type { ActiveTab } from "../../../types/ActiveTab.t";

interface MainLayoutProps {
	currentUser: User | null;
	activeTab: ActiveTab;
	onChangeTab: React.Dispatch<React.SetStateAction<ActiveTab>>;
}

// Main Component
const MainLayout: React.FC<MainLayoutProps> = ({ currentUser, activeTab, onChangeTab }) => {
	return (
		<div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
			<Header currentUser={currentUser} setActiveTab={onChangeTab} />

			<div className="flex flex-1 overflow-hidden">
				<Sidebar activeTab={activeTab} onChangeTab={onChangeTab} />

				<main className="flex-1 p-8 overflow-y-auto">
					<Outlet />
				</main>
			</div>

			<MusicPlayerBar />
		</div>
	);
};

export default MainLayout;
