import { BackendType } from "../backend";
import { Tables } from "../interfaces/Tables";

export function addUserEnv(backend: BackendType, tables: Tables) {
    backend.userHandler.addEnvironment("USER_TABLE_NAME", tables.userTable.tableName);
    backend.userHandler.addEnvironment("TRACK_TABLE_NAME", tables.trackTable.tableName);
    backend.userHandler.addEnvironment("PLAYLIST_TABLE_NAME", tables.playlistTable ? tables.playlistTable.tableName : "PlaylistTable");
}