import { Policy, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { BackendType } from '../backend';
import { RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Stack } from 'aws-cdk-lib';

export function setupApiGatewayPermissions(backend: BackendType, restApi: RestApi, apiStack: Stack) {
    const apiRestPolicy = new Policy(apiStack, "RestApiPolicy", {
        statements: [
            new PolicyStatement({
                actions: ["execute-api:Invoke"],
                resources: [
                    `${restApi.arnForExecuteApi("*", "/user/profile", "dev")}`,
                    `${restApi.arnForExecuteApi("*", "/tracks", "dev")}`,
                    `${restApi.arnForExecuteApi("*", "/tracks/*", "dev")}`,
                ],
            }),
        ],
    });

    backend.auth.resources.authenticatedUserIamRole.attachInlinePolicy(apiRestPolicy);
    backend.auth.resources.unauthenticatedUserIamRole.attachInlinePolicy(apiRestPolicy);
}
