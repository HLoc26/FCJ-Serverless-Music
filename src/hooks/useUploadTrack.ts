import { useState } from "react";
import axiosInstance from "../api/client";
import { isAxiosError } from "axios";

interface UploadResult {
    uploadUrl: string;
    id: string;
}

export function useUploadTrack() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const uploadTrack = async ({ title, duration, file }: { title: string; duration: number; file: File }): Promise<UploadResult | null> => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        console.log(title, duration, file.type)

        if (duration == 0) return null;

        try {
            // Step 1: POST to get signed URL
            const { data } = await axiosInstance.post<UploadResult>("/tracks/upload", {
                title,
                duration,
            });

            const { uploadUrl, id } = data;

            // Step 2: PUT file to signed URL
            await axiosInstance.put(uploadUrl, file, {
                headers: {
                    "Content-Type": file.type,
                },
            });

            setSuccess("Upload successful");
            return { uploadUrl, id };
        } catch (err: any) {
            if (isAxiosError(err)) {
                setError(err.response?.data?.message || err.message || "Upload failed");
            } else {
                setError("Unexpected error during upload.");
            }
            return null;
        } finally {
            setLoading(false);
        }
    };

    return {
        uploadTrack,
        loading,
        error,
        success,
    };
}
