export interface GetUploadUrlData {
    title: string;
    duration: number;
    fileExtension: string;
}

export interface GetUploadUrlResult {
    id: string;
    uploadUrl: string;
    trackUrl: string;
    contentType: string;
}

export interface PutFileResult {
    isSuccess: boolean;
    message?: string
}

export interface UploadTrackParams {
    title: string;
    duration: number;
    file: File;
}

export interface UploadResult {
    uploadUrl: string;
    id: string;
}