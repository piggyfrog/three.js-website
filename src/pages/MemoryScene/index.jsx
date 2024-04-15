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
      <Canvas camera={{ position: [0, 2, 5] }} shadows>
        {/* <OrbitControls /> */}
        <ambientLight intensity={0.3} />

        <directionalLight intensity={1} position={[2, 7, 7]} />
        <directionalLight intensity={0.5} position={[-2, -7, -3]} />
        <OrbitControls />
        {/* <FPV /> */}
        <Physics debug>
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
