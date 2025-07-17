import { BackendType } from "../backend";
import { Tables } from "../interfaces/Tables";

export function addListeningHistoryEnv(backend: BackendType, tables: Tables) {
    backend.listeningHistoryHandler.addEnvironment("PLAYBACK_HISTORY_TABLE_NAME", tables.playbackHistoryTable.tableName);
}