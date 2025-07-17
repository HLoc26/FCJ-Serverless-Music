import { AuthorizationType, CognitoUserPoolsAuthorizer, LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";

export function createPlaylistRoutes(restApi: RestApi, playlistIntegration: LambdaIntegration, cognitoAuth: CognitoUserPoolsAuthorizer) {
    const playlistsPath = restApi.root.addResource("playlists");

    playlistsPath.addMethod("GET", playlistIntegration, {
        authorizationType: AuthorizationType.COGNITO,
        authorizer: cognitoAuth
    });

    playlistsPath.addMethod("POST", playlistIntegration, {
        authorizationType: AuthorizationType.COGNITO,
        authorizer: cognitoAuth
    });

    const playlistIdResource = playlistsPath.addResource("{id}");
    playlistIdResource.addMethod("DELETE", playlistIntegration, {
        authorizationType: AuthorizationType.COGNITO,
        authorizer: cognitoAuth
    });

    playlistIdResource.addResource("track").addMethod("POST", playlistIntegration, {
        authorizationType: AuthorizationType.COGNITO,
        authorizer: cognitoAuth
    });

    playlistIdResource.addResource("tracks").addMethod("DELETE", playlistIntegration, {
        authorizationType: AuthorizationType.COGNITO,
        authorizer: cognitoAuth
    });
}
