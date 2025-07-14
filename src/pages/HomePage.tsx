import React from "react";

// Types
// import { PlaylistCard } from "../components";
import type { User } from "../interfaces";
interface HomeProps {
	currentUser: User | null;
}

// Main Component
const HomePage: React.FC<HomeProps> = ({ currentUser }) => {
	return (
		<div className="max-w-6xl mx-auto">
			{currentUser && currentUser.token && currentUser.displayName != "guest" ? (
				<h2 className="text-3xl font-bold mb-8">
					{""}
					Welcome back, {currentUser.displayName}
				</h2>
			) : (
				<h2 className="text-3xl font-bold mb-8">Hello, guest</h2>
			)}

			{/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{playlist.map((playlist) => (
					<PlaylistCard key={playlist.id} playlist={playlist} onClick={() => handlePlaylistClick(playlist.id)} />
				))}
			</div> */}
		</div>
	);
};

export default HomePage;
