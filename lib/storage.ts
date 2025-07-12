import { v2 as cloudinary } from "cloudinary";
import * as clamav from "clamav.js";

async function scanForMalware(buffer: Buffer) {
  if (!process.env.CLAMAV_HOST) return;
  await new Promise<void>((resolve, reject) => {
    clamav.ping(
      Number(process.env.CLAMAV_PORT) || 3310,
      process.env.CLAMAV_HOST!,
      1000,
      (err: unknown) => {
        if (err) return resolve();
        clamav.scanBuffer(
          buffer,
          Number(process.env.CLAMAV_PORT) || 3310,
          process.env.CLAMAV_HOST!,
          (err2, _file, malicious) => {
            if (err2) return reject(err2);
            if (malicious) return reject(new Error("Malware detected"));
            resolve();
          },
        );
      },
    );
  });
}

/**
 * Upload an avatar image to Cloudinary or S3.
 *
 * @param file - Image file to upload
 * @returns URL of the stored image
 */
export async function uploadAvatar(file: Blob): Promise<string> {
  if (
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  ) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    const buffer = await file.arrayBuffer();

    await scanForMalware(Buffer.from(buffer));
    const url = await new Promise<string>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: "image" },
        (err, result) => {
          if (err || !result) return reject(err);
          resolve(result.secure_url);
        },
      );

      stream.end(Buffer.from(buffer));
    });

    return url;
  }

  if (
    process.env.S3_BUCKET &&
    process.env.S3_REGION &&
    process.env.S3_ACCESS_KEY &&
    process.env.S3_SECRET_KEY
  ) {
    const { S3Client, PutObjectCommand } = await import("@aws-sdk/client-s3");
    const client = new S3Client({
      region: process.env.S3_REGION,
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY!,
        secretAccessKey: process.env.S3_SECRET_KEY!,
      },
    });
    const key = `avatars/${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const buffer = await file.arrayBuffer();

    await scanForMalware(Buffer.from(buffer));

    await client.send(
      new PutObjectCommand({
        Bucket: process.env.S3_BUCKET!,
        Key: key,
        Body: Buffer.from(buffer),
        ContentType: file.type,
        ACL: "public-read",
      }),
    );

    return `https://${process.env.S3_BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com/${key}`;
  }

  throw new Error("No storage provider configured");
}

/**
 * Upload a generic image using the configured provider.
 */
export async function uploadImage(file: Blob): Promise<string> {
  return uploadAvatar(file);
}
