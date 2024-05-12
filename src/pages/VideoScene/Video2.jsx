import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player/lazy";
import Loader from "../../components/Loader";
import { useDialogStore, usePlayerLocationStore } from "../../hooks/store";
import DialogUI from "../../components/DialogUI";
import { useNavigate } from "react-router";
const VideoScene2 = () => {
  const [loading, setLoading] = useState(true);
  const [showUI, setShowUI] = useState(false);
  const setDialogID = useDialogStore((state) => state.setDialogID);
  const setShouldLoad = usePlayerLocationStore((state) => state.setShouldLoad);
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setDialogID("video6");
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
          if (sec % 5 === 0 && sec > 5 && sec < 30) {
            setDialogID(`video${sec / 5 + 5}`);
          }
        }}
        onPlay={() => {
          setShowUI(true);
        }}
        onEnded={() => {
          setTimeout(() => {
            setShouldLoad(true);
            navigate("/main");
          }, 1000);
        }}
      />
      {showUI && <DialogUI />}
    </>
  );
};

export default VideoScene2;
