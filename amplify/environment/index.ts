import { BackendType } from "../backend";
import { Tables } from "../interfaces/Tables";
import { addFavouriteEnv } from "./favourite.env";
import { addListeningHistoryEnv } from "./history.env";
import { addPlaylistEnv } from "./playlist.env";
import { addTrackEnv } from "./track.env";
import { addUserEnv } from "./user.env";


export function addEnvironmentVariables(backend: BackendType, tables: Tables) {
    addUserEnv(backend, tables);
    addTrackEnv(backend, tables);
    addPlaylistEnv(backend, tables);
    addFavouriteEnv(backend, tables);
    addListeningHistoryEnv(backend, tables);
}