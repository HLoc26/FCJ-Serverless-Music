import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDB, S3 } from 'aws-sdk';
import { jsonResponse } from '../../utils/response';
import { env } from '$amplify/env/TrackHandler';

const db = new DynamoDB.DocumentClient();
const s3 = new S3();

export const deleteTrackById = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const userId = event.requestContext.authorizer?.claims?.sub;
    if (!userId) return jsonResponse(401, { message: 'Unauthorized' });

    const trackId = event.pathParameters?.id || event.path.split('/')[2];
    if (!trackId) return jsonResponse(400, { message: 'Missing track ID' });

    // Get track item
    const track = await db.get({
        TableName: env.TRACK_TABLE_NAME,
        Key: { id: trackId },
    }).promise();

    const item = track.Item;
    if (!item) return jsonResponse(404, { message: 'Track not found' });
    if (item.uploadedBy !== userId) return jsonResponse(403, { message: 'Forbidden' });

    const s3Key = item.s3Key;

    // Delete from S3
    if (s3Key) {
        await s3.deleteObject({
            Bucket: env.S3_UPLOAD_BUCKET,
            Key: s3Key,
        }).promise();
    }

    // Delete from TrackTable
    await db.delete({
        TableName: env.TRACK_TABLE_NAME,
        Key: { id: trackId },
    }).promise();

    // ======== Delete from PlaylistTrackTable and update Playlist ========
    const playlistTrackRes = await db.query({
        TableName: env.PLAYLIST_TRACK_TABLE_NAME,
        IndexName: 'byTrackId', // GSI: trackId -> id, playlistId
        KeyConditionExpression: 'trackId = :tid',
        ExpressionAttributeValues: { ':tid': trackId },
    }).promise();

    const playlistTrackItems = playlistTrackRes.Items || [];

    for (const pt of playlistTrackItems) {
        // Delete entry
        await db.delete({
            TableName: env.PLAYLIST_TRACK_TABLE_NAME,
            Key: { id: pt.id }, // or { playlistId, trackId } if composite key
        }).promise();

        // Decrement trackCount in PlaylistTable
        await db.update({
            TableName: env.PLAYLIST_TABLE_NAME,
            Key: { id: pt.playlistId },
            UpdateExpression: 'ADD trackCount :dec',
            ExpressionAttributeValues: {
                ':dec': -1,
            },
        }).promise();
    }

    // ======== Delete from FavouriteTable ========
    const favRes = await db.query({
        TableName: env.FAVOURITE_TABLE_NAME,
        IndexName: 'byTrackId', // GSI: trackId -> id or favouriteListId
        KeyConditionExpression: 'trackId = :tid',
        ExpressionAttributeValues: { ':tid': trackId },
    }).promise();

    const favItems = favRes.Items || [];
    for (const fav of favItems) {
        await db.delete({
            TableName: env.FAVOURITE_TABLE_NAME,
            Key: { id: fav.id }, // or { favouriteListId, trackId } if composite
        }).promise();
    }

    // ======== Delete from PlaybackHistoryTable ========
    const historyRes = await db.query({
        TableName: env.PLAYBACK_HISTORY_TABLE_NAME,
        IndexName: 'byTrackId', // GSI: trackId -> id or userId
        KeyConditionExpression: 'trackId = :tid',
        ExpressionAttributeValues: { ':tid': trackId },
    }).promise();

    const historyItems = historyRes.Items || [];
    for (const h of historyItems) {
        await db.delete({
            TableName: env.PLAYBACK_HISTORY_TABLE_NAME,
            Key: { id: h.id }, // or { userId, trackId } if composite
        }).promise();
    }

    return jsonResponse(200, {
        deleted: trackId,
        removedFromPlaylists: playlistTrackItems.map(pt => pt.playlistId),
        removedFromFavourites: favItems.length,
        removedFromHistories: historyItems.length,
    });
};
