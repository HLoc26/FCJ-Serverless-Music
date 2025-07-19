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
        TableName: 'TrackTable',
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
        TableName: 'TrackTable',
        Key: { id: trackId },
    }).promise();

    // TODO: Optional - clean up PlaylistTrackTable, FavouriteTable, PlaybackHistoryTable

    return jsonResponse(200, { deleted: trackId });
};