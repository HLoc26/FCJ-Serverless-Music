import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { jsonResponse } from '../../utils/response';
import { env } from "$amplify/env/PlaylistHandler";

const db = new DynamoDB.DocumentClient();

export const getPlaylists = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const userId = event.requestContext.authorizer?.claims?.sub;
    console.log("Authorizer", event.requestContext.authorizer)
    if (!userId) return jsonResponse(401, { message: 'Unauthorized' });

    try {
        const params = {
            TableName: env.PLAYLIST_TABLE_NAME!,
            IndexName: 'byUserId',
            KeyConditionExpression: '#uid = :uid',
            ExpressionAttributeNames: { '#uid': 'userId' },
            ExpressionAttributeValues: { ':uid': userId },
        };

        const result = await db.query(params).promise();

        return jsonResponse(200, { playlists: result.Items ?? [] });
    } catch (error) {
        console.error('Error fetching playlists:', error);
        return jsonResponse(500, { message: 'Internal Server Error' });
    }
};
