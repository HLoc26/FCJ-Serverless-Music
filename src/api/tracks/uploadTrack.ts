import axios from "axios";
import type { AxiosResponse } from "axios";
import axiosInstance from "../client";
import type { GetUploadUrlData, GetUploadUrlResult, PutFileResult } from "../../interfaces/api/Upload";

export const postUploadTrack = async ({ title, duration, fileExtension }: GetUploadUrlData): Promise<GetUploadUrlResult> => {
    const response = await axiosInstance.post<GetUploadUrlResult, AxiosResponse<GetUploadUrlResult>, GetUploadUrlData>("tracks/upload", {
        title: title,
        duration: duration,
        fileExtension: fileExtension
    });

    if (!response.data?.uploadUrl) {
        throw new Error("Missing upload URL in response");
    }

    return response.data;
};

export const putTrackFile = async ({ uploadUrl, file, contentType }: { uploadUrl: string; file: File, contentType: string }): Promise<PutFileResult> => {
    const response = await axios.put(uploadUrl, file, {
        headers: {
            "Content-Type": contentType,
        },
    });

    console.log(response)

    return {
        isSuccess: response.status === 200,
        message: response.statusText,
    };
};
