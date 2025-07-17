import { defineFunction } from "@aws-amplify/backend";

export const favouriteHandler = defineFunction({
    name: "FavouriteHandler",
    entry: "./handler.ts",
});