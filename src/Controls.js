import {
  VideocamOutlined,
  VideocamOffOutlined,
  MicNoneOutlined,
  MicOffOutlined,
  LogoutOutlined,
  PodcastsOutlined,
  StopCircleOutlined,
  StopScreenShareOutlined,
  ScreenShareOutlined,
} from "@mui/icons-material";
import { IconButton, Button } from "@mui/material";
import {
  selectHLSState,
  useHMSActions,
  useHMSStore,
  selectIsLocalAudioEnabled,
  selectIsLocalVideoEnabled,
  selectLocalPeer,
  selectPeerScreenSharing,
} from "@100mslive/react-sdk";

function Controls() {
  const hmsActions = useHMSActions();
  const hlsState = useHMSStore(selectHLSState);

  const audioEnabled = useHMSStore(selectIsLocalAudioEnabled);
  const videoEnabled = useHMSStore(selectIsLocalVideoEnabled);
  const localPeer = useHMSStore(selectLocalPeer);
  const enableScreenShare = useHMSStore(selectPeerScreenSharing);

  const startHLSStreaming = async () => {
    try {
      await hmsActions.startHLSStreaming();
    } catch (err) {
      alert(`failed to start hls ${err}`);
    }
  };

  const stopHLSStreaming = async () => {
    try {
      await hmsActions.stopHLSStreaming();
    } catch (err) {
      alert(`failed to stop hls ${err}`);
    }
  };

  // TOGGLE AUDIO AND VISUALS
  const toggleAudio = async () => {
    await hmsActions.setLocalAudioEnabled(!audioEnabled);
  };

  const toggleVideo = async () => {
    await hmsActions.setLocalVideoEnabled(!videoEnabled);
  };

  //TOGGLE SCREENSHARE
  const toggleScreenShare = async () => {
    await hmsActions.setScreenShareEnabled(!enableScreenShare);
  };

  // LEAVE ROOM
  const leaveRoom = async () => {
    if (localPeer.roleName === "player") {
      hmsActions.leave();
      await hmsActions.stopHLSStreaming();
    } else {
      hmsActions.leave();
    }
  };
  return (
    <div className="controls">
      {localPeer.roleName === "player" ? (
        <>
          <IconButton onClick={toggleAudio}>
            {audioEnabled ? <MicNoneOutlined /> : <MicOffOutlined />}
          </IconButton>
          <IconButton onClick={toggleVideo}>
            {videoEnabled ? <VideocamOutlined /> : <VideocamOffOutlined />}
          </IconButton>
          {/* <IconButton onClick={toggleScreenShare}>
            {enableScreenShare ? (
              <StopScreenShareOutlined />
            ) : (
              <ScreenShareOutlined />
            )}
          </IconButton> */}
          <IconButton>
            <StopScreenShareOutlined />
          </IconButton>
          <Button
            variant="contained"
            disableElevation
            className="leave"
            onClick={leaveRoom}
          >
            <LogoutOutlined /> Leave Room
          </Button>
          {/* {hlsState.running ? (
            <Button
              variant="contained"
              disableElevation
              className="leave"
              onClick={stopHLSStreaming}
            >
              <StopCircleOutlined /> Stop Streaming
            </Button>
          ) : (
            <Button
              variant="contained"
              disableElevation
              onClick={startHLSStreaming}
            >
              <PodcastsOutlined /> Go Live
            </Button>
          )} */}
        </>
      ) : (
        <Button
          variant="contained"
          disableElevation
          className="leave"
          onClick={leaveRoom}
        >
          <LogoutOutlined /> Leave Room
        </Button>
      )}
    </div>
  );
}

export default Controls;
