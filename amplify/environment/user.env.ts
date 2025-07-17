import { BackendType } from "../backend";
import { Tables } from "../interfaces/Tables";

export function addUserEnv(backend: BackendType, tables: Tables) {
    backend.userHandler.addEnvironment("USER_TABLE_NAME", tables.userTable.tableName);
}