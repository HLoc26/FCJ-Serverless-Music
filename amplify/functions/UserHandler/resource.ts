import { defineFunction } from "@aws-amplify/backend";

export const userHandler = defineFunction({
    name: "UserHandler",
    entry: "./handler.ts",
})