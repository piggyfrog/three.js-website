import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player/lazy";
import Loader from "../../components/Loader";
import { useDialogStore, usePlayerLocationStore } from "../../hooks/store";
import DialogUI from "../../components/DialogUI";
import { useNavigate } from "react-router";
import GameUI from "../../components/GameUI.jsx";
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
    return <Loader text="loading-video2"/>;
  }
  return (
    <>
      <ReactPlayer
        url="/videos/v2.mp4"
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
      <GameUI />
      <img
          src="/images/time-frame-3.png"
          className="time-frame-png-2"
          alt="Time frame 2"
        />
    </>
  );
};

export default VideoScene2;
