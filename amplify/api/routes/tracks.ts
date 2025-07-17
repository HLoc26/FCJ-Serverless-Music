import { AuthorizationType, CognitoUserPoolsAuthorizer, LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";

export function createTrackRoutes(restApi: RestApi, trackIntegration: LambdaIntegration, cognitoAuth: CognitoUserPoolsAuthorizer) {
    const tracksPath = restApi.root.addResource("tracks");

    tracksPath.addMethod("GET", trackIntegration, {
        authorizationType: AuthorizationType.COGNITO,
        authorizer: cognitoAuth
    });

    const trackIdResource = tracksPath.addResource("{id}");
    trackIdResource.addMethod("GET", trackIntegration, {
        authorizationType: AuthorizationType.COGNITO,
        authorizer: cognitoAuth
    });

    trackIdResource.addMethod("DELETE", trackIntegration, {
        authorizationType: AuthorizationType.COGNITO,
        authorizer: cognitoAuth
    });

    tracksPath.addResource("upload").addMethod("POST", trackIntegration, {
        authorizationType: AuthorizationType.COGNITO,
        authorizer: cognitoAuth
    });

    trackIdResource.addResource("stream").addMethod("GET", trackIntegration, {
        authorizationType: AuthorizationType.COGNITO,
        authorizer: cognitoAuth
    });
}
