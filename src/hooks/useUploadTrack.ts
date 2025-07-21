import { useState } from "react";
import { isAxiosError } from "axios";
import type { GetUploadUrlResult, PutFileResult, UploadResult, UploadTrackParams } from "../interfaces/api/Upload";
import { postUploadTrack, putTrackFile } from "../api/tracks";
import { useCache } from "./useCache";

export function useUploadTrack() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const { data, setUserTracks } = useCache()

    const uploadTrack = async ({ title, duration, file }: UploadTrackParams): Promise<UploadResult | null> => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        if (duration === 0) {
            setError("Invalid track duration.");
            setLoading(false);
            return null;
        }

        try {
            const { uploadUrl, trackItem: track, contentType }: GetUploadUrlResult = await postUploadTrack({
                title: title,
                duration: duration,
                fileExtension: file.name.split('.').pop()?.toLowerCase() || '',
            });

            console.log({ uploadUrl, track, contentType })

            const result: PutFileResult = await putTrackFile({ uploadUrl, file, contentType });

            if (result.isSuccess) {
                setSuccess("Upload successful");
                setUserTracks([...data.userTracks, track]);
                console.log(data.userTracks);
                return { uploadUrl, id: track.id };
            }

            throw new Error(result.message);
        } catch (err) {
            console.error(err)
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
