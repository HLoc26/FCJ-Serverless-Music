import { BackendType } from "../backend";
import { Tables } from "../interfaces/Tables";

export function addTrackEnv(backend: BackendType, tables: Tables) {
    backend.trackHandler.addEnvironment("CLOUDFRONT_DOMAIN", "https://abcxyz.cloudfront.net"); // Replace with yours
    backend.trackHandler.addEnvironment("S3_UPLOAD_BUCKET", backend.fileBucket.resources.bucket.bucketName);
    backend.trackHandler.addEnvironment("TRACK_TABLE_NAME", tables.trackTable.tableName);
}