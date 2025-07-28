import Mux from "@mux/mux-node";

const { Video } = new Mux(
  process.env.MUX_TOKEN_ID!,
  process.env.MUX_TOKEN_SECRET!,
);

export async function uploadVideo(
  fileBuffer: Buffer,
  filename: string,
): Promise<string> {
  const asset = await Video.Assets.create({
    input: { resource: fileBuffer, name: filename },
  });

  return asset.playback_ids?.[0]?.id || "";
}
