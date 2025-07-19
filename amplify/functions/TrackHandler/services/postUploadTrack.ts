import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { v4 as uuidv4 } from "uuid"
import { DynamoDB, S3 } from "aws-sdk"
import { env } from "$amplify/env/TrackHandler"
import { jsonResponse } from "../../utils/response";

const s3 = new S3()

const dynamoDb = new DynamoDB.DocumentClient();

export const postUploadTrack = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const userId = event.requestContext.authorizer?.claims.sub;

    try {
        const body = JSON.parse(event.body || "{}");
        if (!body.title || !body.duration) {
            return { statusCode: 400, body: JSON.stringify({ message: 'Missing title or duration' }) };
        }
        const trackId = uuidv4();
        const fileKey = `tracks/${trackId}.mp3`

        const signedUrl = await s3.getSignedUrlPromise('putObject', {
            Bucket: env.S3_UPLOAD_BUCKET,
            Key: fileKey,
            ContentType: 'audio/mpeg',
            Expires: 300
        })

        // Ghi metadata vào DynamoDB
        const trackUrl = `${env.CLOUDFRONT_DOMAIN}/${fileKey}`;
        const trackItem = {
            id: trackId,
            title: body.title,
            duration: body.duration,
            uploadedBy: userId,
            url: trackUrl,
            s3Key: fileKey,
            createdAt: new Date().toISOString(),
        };

        await dynamoDb
            .put({
                TableName: 'TrackTable',
                Item: trackItem,
            })
            .promise();
        return jsonResponse(201, {
            id: trackId,
            uploadUrl: signedUrl,
            trackUrl,
        })
    } catch (error: any) {
        return jsonResponse(500, { message: error.message });
    }
}