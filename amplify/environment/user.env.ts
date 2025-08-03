import { BackendType } from "../backend";
import { Tables } from "../interfaces/Tables";

export function addUserEnv(backend: BackendType, tables: Tables) {
    backend.userHandler.addEnvironment("USER_TABLE_NAME", tables.userTable ? tables.userTable.tableName : "UserTable");
    backend.userHandler.addEnvironment("TRACK_TABLE_NAME", tables.trackTable ? tables.trackTable.tableName : "TrackTable");
    backend.userHandler.addEnvironment("PLAYLIST_TABLE_NAME", tables.playlistTable ? tables.playlistTable.tableName : "PlaylistTable");
}