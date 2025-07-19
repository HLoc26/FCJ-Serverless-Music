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
