import React, { useState, useEffect } from "react";
import type { Track } from "../../../interfaces";
import { useUserPlaylists } from "../../../hooks/useUserPlaylists";
import { usePlaylistTracks } from "../../../hooks/usePlaylistTracks";
import LoadingSpinner from "../../shared/LoadingSpinner";
import { useCache } from "../../../hooks/useCache";
import { useAddTrackToPlaylist } from "../../../hooks/useAddTrackToPlaylist";

interface Props {
	track: Track;
	onClose: () => void;
}

const AddToPlaylistModal: React.FC<Props> = ({ track, onClose }) => {
	const [selectedIds, setSelectedIds] = useState<string[]>([]);
	const [fetchingPlaylists, setFetchingPlaylists] = useState<string[]>([]);

	const { playlists, loading: loadingPlaylists } = useUserPlaylists();
	const { data } = useCache();
	const { loading, error, addTrack } = useAddTrackToPlaylist();
	const { fetchPlaylistTracks, isTrackInPlaylist } = usePlaylistTracks();

	console.log(data);

	// Fetch tracks cho các playlist chưa có trong cache
	useEffect(() => {
		const fetchMissingPlaylistTracks = async () => {
			const playlistsToFetch = playlists.filter((pl) => !data.playlistTracks[pl.id]);

			if (playlistsToFetch.length > 0) {
				setFetchingPlaylists(playlistsToFetch.map((pl) => pl.id));

				// Fetch song song tất cả playlist
				await Promise.all(playlistsToFetch.map((pl) => fetchPlaylistTracks(pl.id)));

				setFetchingPlaylists([]);
			}
		};

		if (playlists.length > 0) {
			fetchMissingPlaylistTracks();
		}
	}, [playlists]);

	// Tự động tick các playlist đã có track
	useEffect(() => {
		if (playlists.length > 0 && fetchingPlaylists.length === 0) {
			const existingPlaylistIds = playlists.filter((pl) => isTrackInPlaylist(pl.id, track.id)).map((pl) => pl.id);

			setSelectedIds(existingPlaylistIds);
		}
	}, [playlists, track.id, fetchingPlaylists, data.playlistTracks]);

	const toggleSelect = (id: string) => {
		// Không cho phép uncheck playlist đã có track
		const trackExistsInPlaylist = isTrackInPlaylist(id, track.id);
		if (trackExistsInPlaylist) return;

		setSelectedIds((prev) => (prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]));
	};

	const getExistingPlaylistIds = (): string[] => {
		return playlists.filter((pl) => isTrackInPlaylist(pl.id, track.id)).map((pl) => pl.id);
	};

	const handleSubmit = async () => {
		const existingPlaylistIds = getExistingPlaylistIds();
		// Chỉ thêm vào các playlist mới được chọn (không có track)
		const playlistsToAdd = selectedIds.filter((id) => !existingPlaylistIds.includes(id));

		if (playlistsToAdd.length === 0) {
			onClose();
			return;
		}

		try {
			await Promise.all(
				playlistsToAdd.map((playlistId) => {
					console.log("Adding track to playlist:", track);
					return addTrack(playlistId, track);
				})
			);

			onClose();
		} catch (err) {
			console.error("Failed to add track to some playlists", err);
		}
	};

	const isLoadingData = fetchingPlaylists.length > 0 || loadingPlaylists;

	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
			<div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
				<h2 className="text-lg font-semibold mb-4">Add to Playlists</h2>

				{loading || isLoadingData || loadingPlaylists ? (
					<LoadingSpinner text="Loading playlists..." />
				) : error ? (
					<p className="text-red-500">Error loading user playlists. Try reload the page.</p>
				) : (
					<div className="max-h-60 overflow-y-auto space-y-2">
						{playlists.map((pl) => {
							const isInPlaylist = isTrackInPlaylist(pl.id, track.id);
							const isChecked = selectedIds.includes(pl.id);

							return (
								<label key={pl.id} className={`flex items-center gap-2 ${isInPlaylist ? "opacity-75" : "cursor-pointer"}`}>
									<input type="checkbox" checked={isChecked} disabled={isInPlaylist} onChange={() => toggleSelect(pl.id)} className="cursor-pointer disabled:cursor-not-allowed" />
									<span className="text-gray-900 dark:text-gray-100">
										{pl.name}
										{isInPlaylist && <span className="text-sm text-gray-500 ml-2">(already added)</span>}
									</span>
								</label>
							);
						})}
					</div>
				)}

				<div className="mt-4 flex justify-end gap-2">
					<button onClick={onClose} className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700" disabled={loading}>
						Cancel
					</button>
					<button onClick={handleSubmit} className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50" disabled={loading || isLoadingData}>
						Add
					</button>
				</div>
			</div>
		</div>
	);
};

export default AddToPlaylistModal;
