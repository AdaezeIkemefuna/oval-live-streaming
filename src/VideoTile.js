import { useVideo } from "@100mslive/react-sdk";

export default function VideoTile({ peer, peers }) {
  const { videoRef } = useVideo({
    trackId: peer.videoTrack,
  });

  const numberOfplayers = () => {
    const players = peers.filter((peer) => {
      return peer.roleName === "player";
    });
    return players.length;
  };

  return (
    <video
      ref={videoRef}
      className={numberOfplayers() >= 2 ? "video" : ""}
      autoPlay
      muted
      playsInline
    />
  );
}
