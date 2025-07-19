export interface Track {
    id: string;
    title: string;
    duration: number;
    url: string;
    playCount: number;
    likeCount: number;
    uploadedBy: string;
    createdAt?: string;
}
