import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { KeyboardControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import World from "./World.jsx";
import FPScontrols from "../../components/FPScontrols.jsx";
import FPV from "../../components/FPV.jsx";
import { OrbitControls } from "@react-three/drei";
export default function MemoryScene() {
  const [showDialog, setShowDialog] = useState(false);
  useEffect(() => {
    if (showDialog) {
      setTimeout(() => {
        setShowDialog(false);
      }, 3000);
    }
  }, [showDialog]);
  return (
    <>
      <Canvas camera={{ position: [0, 2, 5] }} shadows background="lightblue">
        <ambientLight intensity={1.5} />
        {/* 这两个切换第一还是自由视角  */}
        {/* <OrbitControls />*/}
        <FPV /> 
        <Physics>
          <World />
          <KeyboardControls
            map={[
              { name: "forwardKeyPressed", keys: ["ArrowUp", "KeyW"] },
              { name: "rightKeyPressed", keys: ["ArrowRight", "KeyD"] },
              { name: "backwardKeyPressed", keys: ["ArrowDown", "KeyS"] },
              { name: "leftKeyPressed", keys: ["ArrowLeft", "KeyA"] },
            ]}
          >
            <FPScontrols />
          </KeyboardControls>
        </Physics>
      </Canvas>
      <div className="cursor">&#x25CB;</div>
    </>
  );
}
