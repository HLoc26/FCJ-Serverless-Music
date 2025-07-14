export interface Playlist {
    id: string;
    name: string;
    visibility?: "public" | "private";
    owner: string;
    trackCount: number;
}
