import { a, type ClientSchema, defineData } from "@aws-amplify/backend";

const schema = a.schema({
    User: a
        .model({
            id: a.id().required(),
            email: a.email().required(),
            username: a.string().required(),
            playlists: a.hasMany("Playlist", "createdBy"),
            uploadedTracks: a.hasMany("Track", "uploadedBy"),
            favourites: a.hasMany("Favourite", "userId"),
            playbackHistory: a.hasMany("PlaybackHistory", "userId"),
            createdAt: a.timestamp(),
        })
        .authorization((allow) => [allow.ownerDefinedIn('id'), allow.authenticated().to(["read"])]),

    Track: a
        .model({
            id: a.id().required(),
            title: a.string().required(),
            uploadedBy: a.string().required(), // user id
            creator: a.belongsTo("User", "uploadedBy"),
            playlistTracks: a.hasMany("PlaylistTrack", "trackId"),
            favourites: a.hasMany("Favourite", "trackId"),
            playbackHistory: a.hasMany("PlaybackHistory", "trackId"),
            duration: a.integer().required(), // in seconds
            url: a.url().required(), // S3 or CloudFront URL
            createdAt: a.timestamp(),
        })
        .authorization((allow) => [allow.ownerDefinedIn("uploadedBy"), allow.authenticated().to(["read"])]),

    Playlist: a
        .model({
            id: a.id().required(),
            name: a.string().required(),
            createdBy: a.string().required(), // user id
            creator: a.belongsTo("User", "createdBy"),
            tracks: a.hasMany("PlaylistTrack", "playlistId"),
            createdAt: a.timestamp(),
        })
        .authorization((allow) => [allow.ownerDefinedIn("createdBy"), allow.authenticated().to(["read"])]),

    PlaylistTrack: a
        .model({
            id: a.id().required(),
            playlistId: a.string().required(),
            trackId: a.string().required(),
            playlist: a.belongsTo("Playlist", "playlistId"),
            track: a.belongsTo("Track", "trackId"),
            order: a.integer(),
            addedAt: a.timestamp(),
        })
        .authorization((allow) => [allow.authenticated()]),

    Favourite: a
        .model({
            id: a.id().required(),
            userId: a.string().required(),
            user: a.belongsTo("User", "userId"),
            trackId: a.string().required(),
            track: a.belongsTo("Track", "trackId"),
            likedAt: a.timestamp(),
        })
        .identifier(["userId", "trackId"])
        .authorization((allow) => [allow.ownerDefinedIn("userId"), allow.authenticated().to(["read"])]),

    PlaybackHistory: a
        .model({
            id: a.id().required(),
            userId: a.string().required(),
            user: a.belongsTo("User", "userId"),
            trackId: a.string().required(),
            track: a.belongsTo("Track", "trackId"),
            timestamp: a.timestamp().required(),
        })
        .identifier(["userId", "timestamp"])
        .authorization((allow) => [allow.ownerDefinedIn("userId")]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
    schema,
    authorizationModes: {
        defaultAuthorizationMode: "userPool",
    },
});