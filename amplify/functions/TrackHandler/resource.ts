import { defineFunction } from "@aws-amplify/backend";

export const trackHandler = defineFunction({
    name: "TrackHandler",
    entry: "./handler.ts",
})