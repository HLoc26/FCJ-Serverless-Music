import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { jsonResponse } from '../../utils/response';
import { env } from '$amplify/env/PlaylistHandler';

const db = new DynamoDB.DocumentClient();

export const getTracksOfPlaylist = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    const playlistId = event.pathParameters?.id;
    if (!playlistId) return jsonResponse(400, { message: 'Missing playlist ID' });

    const params = {
        TableName: env.PLAYLIST_TRACK_TABLE_NAME,
        KeyConditionExpression: 'playlistId = :pid',
        ExpressionAttributeValues: {
            ':pid': playlistId,
        },
    };

    try {
        const result = await db.query(params).promise();
        return jsonResponse(200, result.Items);
    } catch (error: any) {
        console.error('Error querying tracks by playlistId:', error);
        return jsonResponse(500, { message: error.message });
    }
};
