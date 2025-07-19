import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { v4 as uuidv4 } from "uuid"
import { DynamoDB, S3 } from "aws-sdk"
import { env } from "$amplify/env/TrackHandler"
import { jsonResponse } from "../../utils/response";
import mime from "mime"

const s3 = new S3()

const dynamoDb = new DynamoDB.DocumentClient();

export const postUploadTrack = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const userId = event.requestContext.authorizer?.claims.sub;

    try {
        const body = JSON.parse(event.body || "{}");
        console.log(body)
        if (!body.title || !body.duration || !body.fileExtension) {
            return jsonResponse(400, { message: 'Missing title, duration or fileExtension' });
        }

        const trackId = uuidv4();
        const ext = body.fileExtension.toLowerCase();

        // Lấy mime type từ extension
        const contentType = mime.getType(ext) || 'application/octet-stream';

        console.log("ContentType", contentType)

        // Đổi key theo đúng đuôi file
        const fileKey = `tracks/${trackId}.${ext}`;

        const signedUrl = await s3.getSignedUrlPromise('putObject', {
            Bucket: env.S3_UPLOAD_BUCKET!,
            Key: fileKey,
            ContentType: contentType,
            Expires: 300
        });

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

        await dynamoDb.put({ TableName: 'TrackTable', Item: trackItem }).promise();

        return jsonResponse(201, {
            id: trackId,
            uploadUrl: signedUrl,
            trackUrl,
            contentType
        });

    } catch (error: any) {
        return jsonResponse(500, { message: error.message });
    }
}
