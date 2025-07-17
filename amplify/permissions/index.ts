import { Policy, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Tables } from '../interfaces/Tables';
import { BackendType } from '../backend';
import { RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Stack } from 'aws-cdk-lib';
import { setupLambdaPermissions } from './lambdaPerms';
import { setupIAMPermissions } from './iamPerms';
import { setupApiGatewayPermissions } from './apiGatewayPerms';

export function setupPermissions(backend: BackendType, tables: Tables, restApi: RestApi, apiStack: Stack) {
    // Grant DynamoDB permissions to Lambda functions
    setupLambdaPermissions(backend, tables);

    // Setup IAM role permissions
    setupIAMPermissions(backend, tables);

    // Setup API Gateway permissions
    setupApiGatewayPermissions(backend, restApi, apiStack);
}


