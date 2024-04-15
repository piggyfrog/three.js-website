import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainScene from "./pages/MainScene";
import MemoryScene from "./pages/MemoryScene";
import React from "react";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainScene />} />
        <Route path="/memory" element={<MemoryScene />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
