import { AuthorizationType, CognitoUserPoolsAuthorizer, LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";

export function createTrackRoutes(restApi: RestApi, trackIntegration: LambdaIntegration, cognitoAuth: CognitoUserPoolsAuthorizer) {
    const tracksPath = restApi.root.addResource("tracks");

    // GET /tracks
    tracksPath.addMethod("GET", trackIntegration, {
        authorizationType: AuthorizationType.COGNITO,
        authorizer: cognitoAuth
    });

    const trackIdResource = tracksPath.addResource("{id}");
    // GET /tracks/{id}
    trackIdResource.addMethod("GET", trackIntegration, {
        authorizationType: AuthorizationType.COGNITO,
        authorizer: cognitoAuth
    });

    // DELETE /tracks/{id}
    trackIdResource.addMethod("DELETE", trackIntegration, {
        authorizationType: AuthorizationType.COGNITO,
        authorizer: cognitoAuth
    });

    // POST /tracks/upload
    tracksPath.addResource("upload").addMethod("POST", trackIntegration, {
        authorizationType: AuthorizationType.COGNITO,
        authorizer: cognitoAuth
    });
}
