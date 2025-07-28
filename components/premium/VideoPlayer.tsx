"use client";

export interface VideoPlayerProps extends React.ComponentProps<"video"> {
  playbackId: string;
}

export default function VideoPlayer({
  playbackId,
  ...props
}: VideoPlayerProps) {
  return (
    <video
      {...props}
      controls
      src={`https://stream.mux.com/${playbackId}.m3u8`}
    >
      <track kind="captions" />
    </video>
  );
}
