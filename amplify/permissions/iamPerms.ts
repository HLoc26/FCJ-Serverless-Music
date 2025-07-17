import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Tables } from '../interfaces/Tables';
import { BackendType } from '../backend';

export function setupIAMPermissions(backend: BackendType, tables: Tables) {
    const authRole = backend.auth.resources.authenticatedUserIamRole;
    if (!authRole) return;

    // Read permissions for all tables
    authRole.addToPrincipalPolicy(
        new PolicyStatement({
            actions: ['dynamodb:GetItem', 'dynamodb:Query', 'dynamodb:Scan'],
            resources: [
                tables.userTable.tableArn,
                tables.trackTable.tableArn,
                tables.playlistTable.tableArn,
                tables.playlistTrackTable.tableArn,
                `${tables.playlistTrackTable.tableArn}/index/*`,
                tables.favouriteTable.tableArn,
                tables.playbackHistoryTable.tableArn,
            ],
        })
    );

    // Write permissions for user-specific data
    authRole.addToPrincipalPolicy(
        new PolicyStatement({
            actions: ['dynamodb:PutItem', 'dynamodb:UpdateItem', 'dynamodb:DeleteItem'],
            resources: [
                tables.favouriteTable.tableArn,
                tables.playbackHistoryTable.tableArn,
            ],
            conditions: {
                'ForAllValues:StringEquals': {
                    'dynamodb:LeadingKeys': ['${aws:username}'],
                },
            },
        })
    );

    // Write permissions for general tables
    authRole.addToPrincipalPolicy(
        new PolicyStatement({
            actions: ['dynamodb:PutItem', 'dynamodb:UpdateItem', 'dynamodb:DeleteItem'],
            resources: [
                tables.userTable.tableArn,
                tables.trackTable.tableArn,
                tables.playlistTable.tableArn,
                tables.playlistTrackTable.tableArn,
                `${tables.playlistTrackTable.tableArn}/index/*`,
            ],
        })
    );
}