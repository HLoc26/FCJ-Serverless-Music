// import type { Track } from "../../interfaces"
import axiosInstance from "../client"

export const getTracks = async () => {
    try {
        const response = await axiosInstance.get("tracks")
        return response
    } catch (error: any) {
        console.log(error);
        throw error;
    }
}

export const getUserTracks = async (userId: string) => {
    if (!userId) {
        throw new Error("Invalid userId")
    }

    const response = await axiosInstance.get(`user/${userId}/tracks`)
    return response
}