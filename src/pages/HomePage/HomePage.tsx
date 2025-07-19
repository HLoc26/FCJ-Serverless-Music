import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import TrackCard from "../../components/shared/TrackCard";
import { PlaylistCard } from "../../components";
import LoadingSpinner from "../../components/shared/LoadingSpinner";

import { getTracks } from "../../api/tracks/getTracks";
import { getPlaylists } from "../../api/playlists/getPlaylists";

import type { Playlist, Track, User } from "../../interfaces";

interface HomeProps {
	currentUser: User | null;
}

const HomePage: React.FC<HomeProps> = ({ currentUser }) => {
	const navigate = useNavigate();

	const [tracks, setTracks] = useState<Track[]>([]);
	const [playlists, setPlaylists] = useState<Playlist[]>([]);
	const [isLoadingTracks, setIsLoadingTracks] = useState(false);
	const [isLoadingPlaylists, setIsLoadingPlaylists] = useState(false);

	const fetchTracks = async () => {
		setIsLoadingTracks(true);
		try {
			const response = await getTracks();
			if (response.data) {
				setTracks(response.data);
			} else {
				console.warn("No tracks returned");
			}
		} catch (error) {
			console.error("Error fetching tracks", error);
		} finally {
			setIsLoadingTracks(false);
		}
	};

	const fetchPlaylists = async () => {
		setIsLoadingPlaylists(true);
		try {
			const response = await getPlaylists();
			if (response.data) {
				setPlaylists(response.data.playlists);
			} else {
				console.warn("No playlists returned");
			}
		} catch (error) {
			console.error("Error fetching playlists", error);
		} finally {
			setIsLoadingPlaylists(false);
		}
	};

	useEffect(() => {
		fetchTracks();
		fetchPlaylists();
	}, []);

	const handlePlaylistClick = (playlistId: string) => {
		navigate(`playlists/${playlistId}`);
	};

	return (
		<div className="max-w-6xl mx-auto p-6 bg-gray-900 min-h-screen">
			<h2 className="text-3xl font-bold mb-8 text-white">{currentUser?.token && currentUser.displayName !== "guest" ? `Welcome back, ${currentUser.displayName}` : "Hello, guest"}</h2>

			<section className="mb-12">
				<h3 className="text-2xl font-semibold text-white mb-6">Tracks Today</h3>
				{isLoadingTracks ? (
					<LoadingSpinner text="Loading tracks" />
				) : tracks.length === 0 ? (
					<p className="text-gray-400">No tracks available today.</p>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{tracks.map((track) => (
							<TrackCard key={track.id} track={track} />
						))}
					</div>
				)}
			</section>

			<section>
				<h3 className="text-2xl font-semibold text-white mb-6">Playlists Today</h3>
				{isLoadingPlaylists ? (
					<LoadingSpinner text="Loading playlists" />
				) : playlists.length === 0 ? (
					<p className="text-gray-400">No playlists created yet.</p>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
						{playlists.map((playlist) => (
							<PlaylistCard key={playlist.id} playlist={playlist} onClick={() => handlePlaylistClick(playlist.id)} />
						))}
					</div>
				)}
			</section>
		</div>
	);
};

export default HomePage;
