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
    <>
      <ReactPlayer
        url="/videos/v1.mp4"
        width={"100svw"}
        height={"100svh"}
        playing={true}
        muted
        onProgress={({ playedSeconds }) => {
          let sec = Math.floor(playedSeconds);
          console.log(sec);
          if (sec % 5 === 0 && sec > 5 && sec < 30) {
            setDialogID(`video${sec / 5}`);
          }
        }}
        onPlay={() => {
          setShowUI(true);
        }}
      />
      {showUI && <DialogUI />}
    </>
  );
};

export default VideoScene;
