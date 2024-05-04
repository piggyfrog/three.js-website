import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainScene from "./pages/MainScene";
import MemoryScene from "./pages/MemoryScene";
import ThirdScene from "./pages/ThirdScene";
import React from "react";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainScene />} />
        <Route path="/memory" element={<MemoryScene />} />
        <Route path="/third" element={<ThirdScene />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
