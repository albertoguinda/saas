# Branding

This project allows uploading custom branding images per user and per site.

## Upload process

1. Images are sent to `/api/branding/upload` for avatars or to `/api/sites/[id]/assets` for site branding using `FormData` with fields `file` and `type` (`logo`, `favicon` o `cover`).
2. Files are validated (PNG/JPG/SVG/ICO, max 512KB) and scanned with ClamAV if `CLAMAV_HOST` is defined.
3. On success images are stored in Cloudinary, S3 o en `LOCAL_ASSETS_DIR` durante el desarrollo.
4. The final URL is stored in MongoDB under `branding.assets` in the site structure.

## Limits

- Max file size: **512KB**.
- Allowed types: **PNG**, **JPG**, **SVG** and **ICO**.
- Configure Cloudinary via `CLOUDINARY_*` variables or S3 via `S3_*` variables.
- Optional malware scanning requires a running ClamAV daemon and the vars `CLAMAV_HOST` and `CLAMAV_PORT`.

## Extend

To add more assets reuse `/api/sites/[id]/assets` with a new `type` field.
