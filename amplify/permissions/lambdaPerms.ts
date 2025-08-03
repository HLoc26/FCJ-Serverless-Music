import { BackendType } from "../backend";
import { Tables } from "../interfaces/Tables";

export function setupLambdaPermissions(backend: BackendType, tables: Tables) {
    // Favourite Handler permissions
    tables.favouriteTable?.grantReadWriteData(backend.favouriteHandler.resources.lambda);

    // ListeningHistory Handler permissions
    tables.playbackHistoryTable?.grantReadWriteData(backend.listeningHistoryHandler.resources.lambda);

    // Playlist Handler permissions
    // Implement it here

    // Track Handler permissions
    // Implement it here

    // User Handler permissions
    tables.userTable.grantReadWriteData(backend.userHandler.resources.lambda);
    tables.trackTable.grantReadWriteData(backend.userHandler.resources.lambda);
    tables.playlistTable?.grantReadWriteData(backend.userHandler.resources.lambda);
}