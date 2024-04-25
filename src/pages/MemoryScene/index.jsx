import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { KeyboardControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import World from "./World.jsx";
import FPScontrols from "../../components/FPScontrols.jsx";
import FPV from "../../components/FPV.jsx";
import { OrbitControls } from "@react-three/drei";
import Items from "./CheckbleItems.jsx";
import DialogUI from "../../components/DialogUI.jsx";
import GameUI from "../../components/GameUI.jsx";
export default function MemoryScene() {
  const [showDialog, setShowDialog] = useState(false);
  useEffect(() => {
    if (showDialog) {
      setTimeout(() => {
        setShowDialog(false);
      }, 8000);
    }
  }, [showDialog]);
  return (
    <KeyboardControls
      map={[
        { name: "forwardKeyPressed", keys: ["KeyW"] },
        { name: "rightKeyPressed", keys: ["KeyD"] },
        { name: "backwardKeyPressed", keys: ["KeyS"] },
        { name: "leftKeyPressed", keys: ["KeyA"] },
        { name: "selectUp", keys: ["ArrowUp"] },
        { name: "selectDown", keys: ["ArrowDown"] },
      ]}
    >
      <Canvas
        camera={{ position: [0, 2, 5] }}
        shadows
        background="lightblue"
        frameloop="demand"
      >
        <ambientLight intensity={1.5} />
        {/* 这两个切换第一还是自由视角  */}
        {/* <OrbitControls />*/}
        <FPV />
        <Physics>
          <World />

          <FPScontrols />

          <Items setShowDialog={setShowDialog} />
        </Physics>
      </Canvas>
      <div className="cursor">&#x25CB;</div>
      <GameUI />
      {!showDialog && (
        <img
          src="/images/time-frame.png"
          className="time-frame-png"
          alt="Time frame"
        />
      )}
      {showDialog && <DialogUI />}
    </KeyboardControls>
  );
}
