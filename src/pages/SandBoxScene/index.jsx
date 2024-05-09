import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import World from "./World.jsx";
import FPScontrols from "../../components/FPScontrols.jsx";
import DialogUI from "../../components/DialogUI.jsx";
import GameUI from "../../components/GameUI.jsx";
import { Suspense } from "react";
import Loader from "../../components/Loader.jsx";
import { OrbitControls } from "@react-three/drei";
import { useKeyboardControls } from "@react-three/drei";
import { useNavigate } from "react-router";
import {
  useDialogStore,
  useGameStateStore,
  useActionStore,
  usePlayerLocationStore,
  useShowPngStore,
} from "../../hooks/store.js";

export default function SandboxScene() {
  const showPng = useShowPngStore((state) => state.show);
  const setShowPng = useShowPngStore((state) => state.setShow);
  const pngPath = useShowPngStore((state) => state.pngPath);
  const [sub, get] = useKeyboardControls();
  useEffect(() => {
    return sub(
      (state) => state.closeDialog,
      (pressed) => {
        if (pressed) {
          setShowPng(false);
        }
      }
    );
  }, []);
  return (
    <Suspense fallback={<Loader text="loading-third" />}>
      <Canvas
        camera={{ position: [5, 28, 15], fov: 45 }}
        shadows
        frameloop="demand"
      >
        <ambientLight intensity={1.5} />
        <OrbitControls target={[10, 0, 0]} />

        <World />
      </Canvas>
      <GameUI />
      {showPng && (
        <div className="item-pic-background">
          <img src={pngPath} alt="item" className="item-img" />
        </div>
      )}
    </Suspense>
  );
}
