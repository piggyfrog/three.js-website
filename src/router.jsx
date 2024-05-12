import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainScene from "./pages/MainScene";
import MemoryScene from "./pages/MemoryScene";
import ThirdScene from "./pages/ThirdScene";
import VideoScene from "./pages/VideoScene";
import React, { useEffect, useState, useRef } from "react";
import Onboarding from "./pages/onboarding";
import { useKeyboardControls } from "@react-three/drei";
import SandboxScene from "./pages/SandBoxScene";
import { useSettingStore } from "./hooks/store";
import End from "./pages/End";
import VideoScene2 from "./pages/VideoScene/Video2";
function Router() {
  const sound = useSettingStore((state) => state.sound);
  const setSound = useSettingStore((state) => state.setSound);
  const audioRef = useRef();
  const [sub, get] = useKeyboardControls();
  useEffect(() => {
    return sub(
      (state) => state.toggleSound,
      (pressed) => {
        if (pressed) {
          setSound(!sound);
        }
      }
    );
  }, [sound]);

  useEffect(() => {
    if (!sound) {
      audioRef.current?.pause();
    } else {
      audioRef.current.volume = 0.3;
      audioRef.current.play();
    }
  }, [sound]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/main" element={<MainScene />} />
        <Route path="/memory" element={<MemoryScene />} />
        <Route path="/third" element={<ThirdScene />} />
        <Route path="/video1" element={<VideoScene />} />
        <Route path="/video2" element={<VideoScene2 />} />
        <Route path="/" element={<Onboarding />} />
        <Route path="/sandbox" element={<SandboxScene />} />
        <Route path="/end" element={<End />} />
      </Routes>
      <audio src="/bgm.mp3" autoPlay loop id="bgm" ref={audioRef} />
    </BrowserRouter>
  );
}

export default Router;
