import axiosInstance from "./client"

export const getUserTracks = async (userId: string) => {
    if (!userId) {
        throw new Error("Invalid userId")
    }

    const response = await axiosInstance.get(`user/${userId}/tracks`)
    return response
}

export const getUserPlaylists = async (userId: string) => {
    if (!userId) {
        throw new Error("Invalid userId")
    }

    const response = await axiosInstance.get(`user/${userId}/playlists`)
    console.log(response)
    return response
}