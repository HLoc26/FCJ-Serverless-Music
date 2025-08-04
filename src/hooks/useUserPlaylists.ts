import { useEffect, useState } from "react";
import { getUserPlaylists } from "../api/users";
import type { Playlist } from "../interfaces";
import type { ToasterProps } from "../interfaces/Toaster";
import { useCache } from "./useCache";
import { fetchUserAttributes, getCurrentUser } from "aws-amplify/auth";

export const useUserPlaylists = (userId?: string | null | undefined) => {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<ToasterProps | null>(null);
    const { data, setUserPlaylists } = useCache();

    const fetchPlaylists = async (id: string) => {
        try {
            setLoading(true);
            const response = await getUserPlaylists(id);
            if (response.status !== 200) {
                throw new Error(response.data?.message || "Failed to fetch playlists");
            }

            setPlaylists(response.data);
            setUserPlaylists(response.data);
        } catch (err: any) {
            setError({ message: err.message, type: "error" });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const load = async () => {
            let id = userId;

            // Nếu không có userId, lấy từ auth
            if (!id) {
                try {
                    const attrs = await fetchUserAttributes();
                    id = attrs.sub;
                } catch (err: any) {
                    setError({ message: "Failed to fetch user attributes", type: "error" });
                    setLoading(false);
                    return;
                }
            }

            if (!id) {
                setLoading(false);
                return;
            }

            if (data.userPlaylists && data.userPlaylists.length > 0) {
                setPlaylists(data.userPlaylists);
                setLoading(false);
                return;
            }

            await fetchPlaylists(id);
            console.log("useUserPlaylist done")
        };
        console.log("useUserPlaylist loading")
        load();
    }, [userId]);

    // Đồng bộ dữ liệu nếu cache thay đổi
    useEffect(() => {
        if (data.userPlaylists && data.userPlaylists.length > 0) {
            setPlaylists(data.userPlaylists);
            setLoading(false);
        }
    }, [data.userPlaylists]);

    return {
        playlists,
        loading,
        error,
        refetch: async () => {
            const id = userId ?? (await getCurrentUser()).userId
            if (id) return fetchPlaylists(id);
        },
        setError,
    };
};
