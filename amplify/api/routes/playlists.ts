import { AuthorizationType, CognitoUserPoolsAuthorizer, LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";

export function createPlaylistRoutes(restApi: RestApi, playlistIntegration: LambdaIntegration, cognitoAuth: CognitoUserPoolsAuthorizer) {
    const playlistsPath = restApi.root.addResource("playlists");

    // GET /playlists
    playlistsPath.addMethod("GET", playlistIntegration, {
        authorizationType: AuthorizationType.COGNITO,
        authorizer: cognitoAuth
    });

    // POST /playlists
    playlistsPath.addMethod("POST", playlistIntegration, {
        authorizationType: AuthorizationType.COGNITO,
        authorizer: cognitoAuth
    });

    const playlistIdResource = playlistsPath.addResource("{id}");
    // GET /playlists/{id}
    playlistIdResource.addMethod("GET", playlistIntegration, {
        authorizationType: AuthorizationType.COGNITO,
        authorizer: cognitoAuth
    });

    // DELETE /playlists/{id}
    playlistIdResource.addMethod("DELETE", playlistIntegration, {
        authorizationType: AuthorizationType.COGNITO,
        authorizer: cognitoAuth
    });

    // POST /playlist/{id}/track
    playlistIdResource.addResource("track").addMethod("POST", playlistIntegration, {
        authorizationType: AuthorizationType.COGNITO,
        authorizer: cognitoAuth
    });

    const tracksResource = playlistIdResource.addResource("tracks");

    // GET /playlist/{id}/tracks
    tracksResource.addMethod("GET", playlistIntegration, {
        authorizationType: AuthorizationType.COGNITO,
        authorizer: cognitoAuth,
    });

    // DELETE /playlist/{id}/tracks
    tracksResource.addMethod("DELETE", playlistIntegration, {
        authorizationType: AuthorizationType.COGNITO,
        authorizer: cognitoAuth,
    });
}
