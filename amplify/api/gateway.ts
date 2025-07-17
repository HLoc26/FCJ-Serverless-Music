import {
    CognitoUserPoolsAuthorizer,
    Cors,
    LambdaIntegration,
    RestApi
} from "aws-cdk-lib/aws-apigateway";
import { Stack } from "aws-cdk-lib";

import { BackendType } from "../backend"
import { createUserRoutes } from './routes/user';
import { createTrackRoutes } from './routes/tracks';
import { createPlaylistRoutes } from './routes/playlists';
import { createFavouriteRoutes } from './routes/favourites';
import { createHistoryRoutes } from './routes/history';

export function createApiGateway(backend: BackendType): { restApi: RestApi, apiStack: Stack } {
    const apiStack = backend.createStack("api-stack");

    const restApi = new RestApi(apiStack, "RestApi", {
        restApiName: "fcjmusicrestapi",
        deploy: true,
        deployOptions: {
            stageName: "dev"
        },
        defaultCorsPreflightOptions: {
            allowOrigins: Cors.ALL_ORIGINS,
            allowMethods: Cors.ALL_METHODS,
            allowHeaders: Cors.DEFAULT_HEADERS
        }
    });

    const cognitoAuth = new CognitoUserPoolsAuthorizer(apiStack, "CognitoAuth", {
        cognitoUserPools: [backend.auth.resources.userPool],
    });

    // Create Lambda integrations
    const integrations = {
        favourite: new LambdaIntegration(backend.favouriteHandler.resources.lambda),
        listeningHistory: new LambdaIntegration(backend.listeningHistoryHandler.resources.lambda),
        playlist: new LambdaIntegration(backend.playlistHandler.resources.lambda),
        track: new LambdaIntegration(backend.trackHandler.resources.lambda),
        user: new LambdaIntegration(backend.userHandler.resources.lambda)
    };

    // Create routes
    createUserRoutes(restApi, integrations.user, cognitoAuth);
    createTrackRoutes(restApi, integrations.track, cognitoAuth);
    createPlaylistRoutes(restApi, integrations.playlist, cognitoAuth);
    createFavouriteRoutes(restApi, integrations.favourite, cognitoAuth);
    createHistoryRoutes(restApi, integrations.listeningHistory, cognitoAuth);

    return { restApi, apiStack };
}
