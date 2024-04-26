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
import { EffectComposer, DepthOfField,N8AO, Bloom } from '@react-three/postprocessing';

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
        <EffectComposer>
          <Bloom
           luminanceThreshold={0.5} // 控制从哪个亮度值开始应用泛光
           luminanceSmoothing={0.8}  // 泛光的平滑度，较低的值会使泛光效果更尖锐
           intensity={0.5}          // 泛光的强度
          />
          <DepthOfField
            focusDistance={0.2}  // 焦点距离，可以调整
            focalLength={1.5}     // 焦距，可以调整
            bokehScale={8}         // 虚化程度，可以调整
            height={480}           // 渲染分辨率，可以调整
          />
          
          <N8AO color="#696969" aoRadius={1} intensity={1} />
        </EffectComposer>
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
