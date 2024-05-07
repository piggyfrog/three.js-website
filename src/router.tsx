import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainScene from "./pages/MainScene";
import MemoryScene from "./pages/MemoryScene";
import ThirdScene from "./pages/ThirdScene";
import VideoScene from "./pages/VideoScene";
import React from "react";
import Onboarding from "./pages/onboarding";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainScene />} />
        <Route path="/memory" element={<MemoryScene />} />
        <Route path="/third" element={<ThirdScene />} />
        <Route path="/video" element={<VideoScene />} />
        <Route path="/onboarding" element={<Onboarding />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
