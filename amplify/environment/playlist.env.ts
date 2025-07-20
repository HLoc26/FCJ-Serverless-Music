import { BackendType } from "../backend";
import { Tables } from "../interfaces/Tables";

export function addPlaylistEnv(backend: BackendType, tables: Tables) {
    backend.playlistHandler.addEnvironment("PLAYLIST_TABLE_NAME", tables.playlistTable.tableName);
    backend.playlistHandler.addEnvironment("PLAYLIST_TRACK_TABLE_NAME", tables.playlistTrackTable.tableName);
    backend.playlistHandler.addEnvironment("TRACK_TABLE_NAME", tables.trackTable.tableName);
}