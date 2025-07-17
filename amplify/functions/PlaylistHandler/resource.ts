import { defineFunction } from "@aws-amplify/backend";

export const playlistHandler = defineFunction({
    name: "PlaylistHandler",
    entry: "./handler.ts"
})