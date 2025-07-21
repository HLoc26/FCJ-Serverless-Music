import type { Track } from "./Track";

export interface Playlist {
    id: string;
    name: string;
    owner: string;
    tracks?: Track[];
    trackCount: number;
    createdAt?: string;
}
