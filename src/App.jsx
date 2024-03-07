import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { KeyboardControls, PointerLockControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import World from "./World.jsx";
import FPScontrols from "./FPScontrols.jsx";
import { OrbitControls } from "@react-three/drei";

export default function Viewer() {
  const ref = useRef();
  return (
    <>
      <Canvas camera={{ position: [0, 2, 5] }} flat shadows dpr={[1, 2]}>
        {/* <OrbitControls /> */}
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
        <ambientLight intensity={0.3} />

        <directionalLight intensity={1} position={[2, 7, 7]} />
        <directionalLight intensity={0.5} position={[-2, -7, -3]} />

        <PointerLockControls />
      </Canvas>
    </>
  );
}
