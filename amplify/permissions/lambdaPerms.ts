import { BackendType } from "../backend";
import { Tables } from "../interfaces/Tables";

export function setupLambdaPermissions(backend: BackendType, tables: Tables) {
    // Favourite Handler permissions
    tables.favouriteTable.grantReadWriteData(backend.favouriteHandler.resources.lambda);

    // ListeningHistory Handler permissions
    tables.playbackHistoryTable.grantReadWriteData(backend.listeningHistoryHandler.resources.lambda);

    // Playlist Handler permissions
    tables.playlistTable.grantReadWriteData(backend.playlistHandler.resources.lambda);
    tables.playlistTrackTable.grantReadWriteData(backend.playlistHandler.resources.lambda);

    // Track Handler permissions
    backend.fileBucket.resources.bucket.grantPut(backend.trackHandler.resources.lambda);
    backend.fileBucket.resources.bucket.grantDelete(backend.trackHandler.resources.lambda);
    tables.trackTable.grantReadWriteData(backend.trackHandler.resources.lambda);
    tables.playlistTrackTable.grantReadWriteData(backend.trackHandler.resources.lambda);
    tables.favouriteTable.grantReadWriteData(backend.trackHandler.resources.lambda);
    tables.playbackHistoryTable.grantReadWriteData(backend.trackHandler.resources.lambda);

    // User Handler permissions
    tables.userTable.grantReadWriteData(backend.userHandler.resources.lambda);
}