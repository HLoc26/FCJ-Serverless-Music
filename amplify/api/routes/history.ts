
import { AuthorizationType, CognitoUserPoolsAuthorizer, LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";

export function createHistoryRoutes(restApi: RestApi, historyIntegration: LambdaIntegration, cognitoAuth: CognitoUserPoolsAuthorizer) {
	const historyPath = restApi.root.addResource("history");

	historyPath.addMethod("GET", historyIntegration, {
		authorizationType: AuthorizationType.COGNITO,
		authorizer: cognitoAuth
	});

	historyPath.addMethod("POST", historyIntegration, {
		authorizationType: AuthorizationType.COGNITO,
		authorizer: cognitoAuth
	});
}