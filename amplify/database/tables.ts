import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { BackendType } from '../backend';
import { Tables } from '../interfaces/Tables';

export function createDynamoDBTables(backend: BackendType): Tables {
    const userTable = new dynamodb.TableV2(backend.stack, 'UserTable', {
        partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
        tableName: 'UserTable',
    });

    const trackTable = new dynamodb.TableV2(backend.stack, 'TrackTable', {
        partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
        tableName: 'TrackTable',
        globalSecondaryIndexes: [
            {
                indexName: 'byUserId',
                partitionKey: { name: 'uploadedBy', type: dynamodb.AttributeType.STRING },
            },
        ],
    });

    return {
        userTable,
        trackTable
    };
}
