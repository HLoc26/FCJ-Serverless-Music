import React from "react";
import TrackCard from "../components/shared/TrackCard";
import { PlaylistCard } from "../components";
import type { Track, User } from "../interfaces";

interface HomeProps {
	currentUser: User | null;
}
interface Track {
	id: string;
	title: string;
	duration: number;
	url: string;
	playCount: number;
	likeCount: number;
	uploadedBy: string;
}
// Mock data
const mockTracks: Track[] = [
	{
		id: "1",
		title: "Bohemian Rhapsody",
		uploadedBy: "Queen",
		duration: 132,
		url: "/audio/Lost_in_the_Night-1.mp3",
		likeCount: 0,
		playCount: 0,
	},
	{
		id: "2",
		title: "Imagine",
		uploadedBy: "John Lennon",
		duration: 214,
		url: "/audio/Lost_in_the_Night-1.mp3",
		likeCount: 0,
		playCount: 0,
	},
	{
		id: "3",
		title: "Hotel California",
		uploadedBy: "Eagles",
		duration: 331,
		url: "/audio/Lost_in_the_Night-1.mp3",
		likeCount: 0,
		playCount: 0,
	},
	{
		id: "4",
		title: "Stairway to Heaven",
		uploadedBy: "Led Zeppelin",
		duration: 416,
		url: "/audio/Lost_in_the_Night-1.mp3",
		likeCount: 0,
		playCount: 0,
	},
	{
		id: "5",
		title: "Billie Jean",
		uploadedBy: "Michael Jackson",
		duration: 221,
		url: "/audio/Lost_in_the_Night-1.mp3",
		likeCount: 0,
		playCount: 0,
	},
	{
		id: "6",
		title: "Sweet Child O' Mine",
		uploadedBy: "Guns N' Roses",
		duration: 315,
		url: "/audio/Lost_in_the_Night-1.mp3",
		likeCount: 0,
		playCount: 0,
	},
	{
		id: "7",
		title: "Purple Rain",
		uploadedBy: "Prince",
		duration: 213,
		url: "/audio/Lost_in_the_Night-1.mp3",
		likeCount: 0,
		playCount: 0,
	},
	{
		id: "8",
		title: "Don't Stop Believin'",
		uploadedBy: "Journey",
		duration: 144,
		url: "/audio/Lost_in_the_Night-1.mp3",
		likeCount: 0,
		playCount: 0,
	},
	{
		id: "9",
		title: "Smells Like Teen Spirit",
		uploadedBy: "Nirvana",
		duration: 332,
		url: "/audio/Lost_in_the_Night-1.mp3",
		likeCount: 0,
		playCount: 0,
	},
	{
		id: "10",
		title: "Wonderwall",
		uploadedBy: "Oasis",
		duration: 215,
		url: "/audio/Lost_in_the_Night-1.mp3",
		likeCount: 0,
		playCount: 0,
	},
];

const mockPlaylists: Playlist[] = [
	{ id: "1", name: "Classic Rock Hits", description: "The greatest rock songs of all time", trackCount: 25, creator: "Music Lover" },
	{ id: "2", name: "Chill Vibes", description: "Perfect songs for relaxation", trackCount: 18, creator: "Zen Master" },
	{ id: "3", name: "Workout Mix", description: "High-energy tracks for your workout", trackCount: 30, creator: "Fitness Guru" },
	{ id: "4", name: "80s Nostalgia", description: "Take a trip back to the 80s", trackCount: 22, creator: "RetroFan" },
	{ id: "5", name: "Indie Discoveries", description: "Hidden gems from indie artists", trackCount: 15, creator: "Indie Explorer" },
];

const HomePage: React.FC<HomeProps> = ({ currentUser }) => {
	const handleTrackClick = (trackId: string) => {
		console.log(`Playing track: ${trackId}`);
	};

	const handlePlaylistClick = (playlistId: string) => {
		console.log(`Opening playlist: ${playlistId}`);
	};

	return (
		<div className="max-w-6xl mx-auto p-6 bg-gray-900 min-h-screen">
			{currentUser && currentUser.token && currentUser.displayName !== "guest" ? (
				<h2 className="text-3xl font-bold mb-8 text-white">Welcome back, {currentUser.displayName}</h2>
			) : (
				<h2 className="text-3xl font-bold mb-8 text-white">Hello, guest</h2>
			)}

			{/* Popular Tracks Section */}
			<section className="mb-12">
				<h3 className="text-2xl font-semibold text-white mb-6">Tracks Today</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{mockTracks.map((track) => (
						<TrackCard key={track.id} track={track} onClick={() => handleTrackClick(track.id)} />
					))}
				</div>
			</section>

			{/* Featured Playlists Section */}
			<section>
				<h3 className="text-2xl font-semibold text-white mb-6">Playlists Today</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
					{mockPlaylists.map((playlist) => (
						<PlaylistCard key={playlist.id} playlist={playlist} onClick={() => handlePlaylistClick(playlist.id)} />
					))}
				</div>
			</section>
		</div>
	);
};

export default HomePage;
