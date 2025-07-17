import { AuthorizationType, CognitoUserPoolsAuthorizer, LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";

export function createUserRoutes(restApi: RestApi, userIntegration: LambdaIntegration, cognitoAuth: CognitoUserPoolsAuthorizer) {
    const userPath = restApi.root.addResource("user");
    const profilePath = userPath.addResource("profile");

    profilePath.addMethod("GET", userIntegration, {
        authorizationType: AuthorizationType.COGNITO,
        authorizer: cognitoAuth,
    });

    profilePath.addMethod("PUT", userIntegration, {
        authorizationType: AuthorizationType.COGNITO,
        authorizer: cognitoAuth,
    });
}