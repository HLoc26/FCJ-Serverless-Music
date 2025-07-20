import { env } from '$amplify/env/UserHandler';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { jsonResponse } from '../../utils/response';

const dynamoDb = new DynamoDB.DocumentClient();

export const getUserPlaylists = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const userId = event.pathParameters?.id;
    if (!userId) return jsonResponse(400, { message: 'Missing user ID' });

    const params = {
        TableName: env.PLAYLIST_TABLE_NAME,
        IndexName: 'byUserId',
        KeyConditionExpression: '#owner = :uid',
        ExpressionAttributeNames: {
            '#owner': 'owner',
        },
        ExpressionAttributeValues: {
            ':uid': userId,
        },
    };

    try {
        const result = await dynamoDb.query(params).promise();
        return jsonResponse(200, result.Items);
    } catch (error: any) {
        console.error('Error querying playlists by userId:', error);
        return jsonResponse(500, { message: error.message });
    }
};
