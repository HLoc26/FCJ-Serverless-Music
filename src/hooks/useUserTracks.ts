import { useState, useEffect } from "react";
import { getUserTracks } from "../api/users";
import { useCache } from "./useCache"; // giả sử bạn để hook cache ở đây
import type { Track, User } from "../interfaces";
import type { ToasterProps } from "../interfaces/Toaster";

export const useUserTracks = (currentUser: User | null) => {
    const { data, setUserTracks } = useCache();
    const [tracks, setTracks] = useState<Track[]>([]);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState<ToasterProps | null>(null);

    useEffect(() => {
        if (!currentUser) {
            setTracks([]);
            setLoading(false);
            return;
        }

        const cachedTracks = data.userTracks;
        if (cachedTracks.length > 0) {
            setTracks(cachedTracks);
            setLoading(false);
            return;
        }

        const fetchTracks = async () => {
            try {
                setLoading(true);
                const response = await getUserTracks(currentUser.id);
                setTracks(response.data);
                setUserTracks(response.data); // cập nhật cache
            } catch (error: any) {
                setToast({ message: error.message, type: "error" });
            } finally {
                setLoading(false);
            }
        };

        fetchTracks();
    }, [currentUser, data.userTracks, setUserTracks]);

    return { tracks, loading, toast, setToast };
};
