import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { jsonResponse } from '../../utils/response';
import { env } from "$amplify/env/PlaylistHandler"


const db = new DynamoDB.DocumentClient();

export const getPlaylists = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const userId = event.requestContext.authorizer?.jwt?.claims?.sub;
    if (!userId) return jsonResponse(401, { message: 'Unauthorized' });

    const params = {
        TableName: env.PLAYLIST_TABLE_NAME!,
        FilterExpression: '#uid = :uid',
        ExpressionAttributeNames: { '#uid': 'userId' },
        ExpressionAttributeValues: { ':uid': userId },
    };

    const result = await db.scan(params).promise();
    return jsonResponse(200, { playlists: result.Items });
};
