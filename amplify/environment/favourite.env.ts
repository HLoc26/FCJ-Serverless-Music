import { BackendType } from "../backend";
import { Tables } from "../interfaces/Tables";

export function addFavouriteEnv(backend: BackendType, tables: Tables) {
    backend.favouriteHandler.addEnvironment("FAVOURITE_TABLE_NAME", tables.favouriteTable.tableName);
}