import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { fileBucket } from './storage/resource';
import { trackHandler } from "./functions/TrackHandler/resource";
import { userHandler } from "./functions/UserHandler/resource";
import { favouriteHandler } from "./functions/FavouriteHandler/resource";
import { listeningHistoryHandler } from "./functions/ListeningHistoryHandler/resource";
import { playlistHandler } from "./functions/PlaylistHandler/resource";
import { createApiGateway } from './api/gateway';
import { createDynamoDBTables } from './database/tables';
import { setupPermissions } from './permissions';
import { addEnvironmentVariables } from './environment';

const backend = defineBackend({
	auth,
	fileBucket,
	trackHandler,
	userHandler,
	favouriteHandler,
	listeningHistoryHandler,
	playlistHandler
});

export type BackendType = typeof backend;
// Create API Gateway and routes
const { restApi, apiStack } = createApiGateway(backend);

// Create DynamoDB tables
const tables = createDynamoDBTables(backend);

// Setup permissions
setupPermissions(backend, tables, restApi, apiStack);

// Add environment variables
addEnvironmentVariables(backend, tables);

// Add outputs
backend.addOutput({
	custom: {
		API: {
			[restApi.restApiName]: {
				endpoint: restApi.url,
				region: backend.stack.region,
				apiName: restApi.restApiName,
			},
		},
		DynamoDB: {
			UserTable: tables.userTable.tableName,
			TrackTable: tables.trackTable.tableName,
			PlaylistTable: tables.playlistTable?.tableName,
			PlaylistTrackTable: tables.playlistTrackTable?.tableName,
			FavouriteTable: tables.favouriteTable?.tableName,
			PlaybackHistoryTable: tables.playbackHistoryTable?.tableName,
		},
	},
});
