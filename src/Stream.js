import VideoTile from "./VideoTile";
import HlsView from "./HlsView";
import {
  selectLocalPeer,
  selectPeers,
  useHMSStore,
} from "@100mslive/react-sdk";

function Stream() {
  const peers = useHMSStore(selectPeers);
  const localPeer = useHMSStore(selectLocalPeer);
  return (
    <div className="stream">
      {localPeer.roleName === "player" &&
        peers
          .filter((peer) => peer.roleName === "player")
          .map((peer) => <VideoTile key={peer.id} peer={peer} peers={peers} />)}
      {localPeer.roleName === "hls-viewer" && <HlsView />}
    </div>
  );
}

export default Stream;
