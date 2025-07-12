# Branding

This project allows uploading custom logo and favicon for each user.

## Upload process

1. Images are sent to `/api/branding/upload` using `FormData` with fields `file` and `type` (`logo` or `favicon`).
2. Files are validated (PNG/JPG/SVG, max 1MB) and scanned with ClamAV if `CLAMAV_HOST` is defined.
3. On success images are stored in Cloudinary or S3 depending on environment variables.
4. The final URL is stored in MongoDB in the `Branding` collection.

## Limits

- Max file size: **1MB**.
- Allowed types: **PNG**, **JPG** and **SVG**.
- Configure Cloudinary via `CLOUDINARY_*` variables or S3 via `S3_*` variables.
- Optional malware scanning requires a running ClamAV daemon and the vars `CLAMAV_HOST` and `CLAMAV_PORT`.

## Extend

To add more assets like cover images, reuse the same endpoint with a new `type` field and store the URL in your schema.
