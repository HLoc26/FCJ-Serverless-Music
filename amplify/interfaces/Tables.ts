import { TableV2 } from 'aws-cdk-lib/aws-dynamodb';

export interface Tables {
    userTable: TableV2;
    trackTable: TableV2;
    playlistTable: TableV2;
    playlistTrackTable: TableV2;
    favouriteTable: TableV2;
    playbackHistoryTable: TableV2;
}