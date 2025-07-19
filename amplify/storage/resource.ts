import { defineStorage } from "@aws-amplify/backend";

export const fileBucket = defineStorage({
    name: "fcjmusicfiles",
})