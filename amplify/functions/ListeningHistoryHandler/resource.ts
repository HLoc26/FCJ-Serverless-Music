import { defineFunction } from "@aws-amplify/backend";

export const listeningHistoryHandler = defineFunction({
    name: "ListeningHistoryHandler",
    entry: "./handler.ts"
})