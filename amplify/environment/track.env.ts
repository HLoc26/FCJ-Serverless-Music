import { BackendType } from "../backend";
import { Tables } from "../interfaces/Tables";

export function addTrackEnv(backend: BackendType, tables: Tables) {
    backend.trackHandler.addEnvironment("CLOUDFRONT_DOMAIN", "https://abcxyz.cloudfront.net"); // Replace with yours
    backend.trackHandler.addEnvironment("S3_UPLOAD_BUCKET", backend.fileBucket.resources.bucket.bucketName);
    backend.trackHandler.addEnvironment("TRACK_TABLE_NAME", tables.trackTable.tableName);
    backend.trackHandler.addEnvironment("PLAYLIST_TABLE_NAME", tables.playlistTable ? tables.playlistTable.tableName : "PlaylistTable");
    backend.trackHandler.addEnvironment("PLAYLIST_TRACK_TABLE_NAME", tables.playlistTrackTable ? tables.playlistTrackTable.tableName : "PlaylistTrackTable");
    backend.trackHandler.addEnvironment("FAVOURITE_TABLE_NAME", tables.favouriteTable ? tables.favouriteTable.tableName : "FavouriteTable");
    backend.trackHandler.addEnvironment("PLAYBACK_HISTORY_TABLE_NAME", tables.playbackHistoryTable ? tables.playbackHistoryTable.tableName : "PlaybackHistoryTable");

}