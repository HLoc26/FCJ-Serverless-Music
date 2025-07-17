import { AuthorizationType, CognitoUserPoolsAuthorizer, LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";

export function createFavouriteRoutes(restApi: RestApi, favouriteIntegration: LambdaIntegration, cognitoAuth: CognitoUserPoolsAuthorizer) {
    const favoritesPath = restApi.root.addResource("favorites");

    favoritesPath.addMethod("DELETE", favouriteIntegration, {
        authorizationType: AuthorizationType.COGNITO,
        authorizer: cognitoAuth
    });

    favoritesPath.addMethod("GET", favouriteIntegration, {
        authorizationType: AuthorizationType.COGNITO,
        authorizer: cognitoAuth
    });

    favoritesPath.addMethod("POST", favouriteIntegration, {
        authorizationType: AuthorizationType.COGNITO,
        authorizer: cognitoAuth
    });
}
