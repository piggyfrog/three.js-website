import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player/lazy";
import Loader from "../../components/Loader";
import { useDialogStore } from "../../hooks/store";
import DialogUI from "../../components/DialogUI";
import { KeyboardControls } from "@react-three/drei";
const VideoScene = () => {
  const [loading, setLoading] = useState(true);
  const [showUI, setShowUI] = useState(false);
  const setDialogID = useDialogStore((state) => state.setDialogID);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setDialogID("video1");
    }, 3000);
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <KeyboardControls
      map={[
        { name: "forwardKeyPressed", keys: ["KeyW"] },
        { name: "rightKeyPressed", keys: ["KeyD"] },
        { name: "backwardKeyPressed", keys: ["KeyS"] },
        { name: "leftKeyPressed", keys: ["KeyA"] },
        { name: "selectUp", keys: ["ArrowUp"] },
        { name: "selectDown", keys: ["ArrowDown"] },
        { name: "nextPage", keys: ["ArrowRight"] },
        { name: "select", keys: ["Space"] },
        { name: "closeDialog", keys: ["KeyQ"] },
      ]}
    >
      <ReactPlayer
        url="/videos/v1.mp4"
        width={"100svw"}
        height={"100svh"}
        playing={true}
        muted
        onProgress={({ playedSeconds }) => {
          let sec = Math.floor(playedSeconds);
          console.log(sec);
          if (sec % 5 === 0 && sec > 5) {
            setDialogID(`video${sec / 5}`);
          }
        }}
        onPlay={() => {
          setShowUI(true);
        }}
      />
      {showUI && <DialogUI />}
    </KeyboardControls>
  );
};

export default VideoScene;
