import { defineStorage } from "@aws-amplify/backend";

export const fileBucket = defineStorage({
    name: "fcjmusicfiles",
})

export const webUiBucket = defineStorage({
    name: "fcjwebserver",
    isDefault: true,
})