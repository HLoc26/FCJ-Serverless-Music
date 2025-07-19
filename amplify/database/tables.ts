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
    });

    const playlistTable = new dynamodb.TableV2(backend.stack, 'PlaylistTable', {
        partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
        tableName: 'PlaylistTable',
        globalSecondaryIndexes: [
            {
                indexName: 'byUserId',
                partitionKey: { name: 'userId', type: dynamodb.AttributeType.STRING },
            },
        ],
    });

    const playlistTrackTable = new dynamodb.TableV2(backend.stack, 'PlaylistTrackTable', {
        partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
        tableName: 'PlaylistTrackTable',
        globalSecondaryIndexes: [
            {
                indexName: 'byPlaylistId',
                partitionKey: { name: 'playlistId', type: dynamodb.AttributeType.STRING },
                sortKey: { name: 'trackId', type: dynamodb.AttributeType.STRING },
            },
        ],
    });

    const favouriteTable = new dynamodb.TableV2(backend.stack, 'FavouriteTable', {
        partitionKey: { name: 'userId', type: dynamodb.AttributeType.STRING },
        sortKey: { name: 'trackId', type: dynamodb.AttributeType.STRING },
        tableName: 'FavouriteTable',
    });

    const playbackHistoryTable = new dynamodb.TableV2(backend.stack, 'PlaybackHistoryTable', {
        partitionKey: { name: 'userId', type: dynamodb.AttributeType.STRING },
        sortKey: { name: 'timestamp', type: dynamodb.AttributeType.STRING },
        tableName: 'PlaybackHistoryTable',
    });

    return {
        userTable,
        trackTable,
        playlistTable,
        playlistTrackTable,
        favouriteTable,
        playbackHistoryTable
    };
}
