import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { KeyboardControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import World from "./World.jsx";
import FPScontrols from "../../components/FPScontrols.jsx";
import FPV from "../../components/FPV.jsx";
import DialogUI from "../../components/DialogUI.jsx";
import GameUI from "../../components/GameUI.jsx";
import {
  EffectComposer,
  DepthOfField,
  N8AO,
  Bloom,
} from "@react-three/postprocessing";
import { Suspense } from "react";
import Loader from "../../components/Loader.jsx";
import { useNavigate } from "react-router";
import {
  useDialogStore,
  useGameStateStore,
  useActionStore,
  usePlayerLocationStore,
} from "../../hooks/store.js";

export default function ThirdScene() {
  const showDialogStore = useDialogStore((state) => state.isOpen);
  const useGameState = useGameStateStore((state) => state.gameState);
  const setShouldLoad = usePlayerLocationStore((state) => state.setShouldLoad);
  const action = useActionStore((state) => state.action);
  const [bloom, setBloom] = useState({
    luminanceThreshold: 0.5, // 控制从哪个亮度值开始应用泛光
    luminanceSmoothing: 0.8, // 泛光的平滑度，较低的值会使泛光效果更尖锐
    intensity: 0.2,
    layers: 0, // 用于指定哪些层应用泛光
  });

  const navigate = useNavigate();

  useEffect(() => {
    console.log("gameState", useGameState);
  }, [useGameState]);

  useEffect(() => {
    if (action === "ChangeScene2") {
      setShouldLoad(true);
      navigate("/memory");
    }
    if (action === "playLaoLaoAnimation") {
      setBloom({
        luminanceThreshold: 0.001,
        luminanceSmoothing: 1,
        intensity: 1000,
        layers: 0,
      });
      // 重置泛光参数
    }
  }, [action]);

  return (
    <Suspense fallback={<Loader text="loading-third" />}>
      <KeyboardControls
        map={[
          { name: "forwardKeyPressed", keys: ["KeyW"] },
          { name: "rightKeyPressed", keys: ["KeyD"] },
          { name: "backwardKeyPressed", keys: ["KeyS"] },
          { name: "leftKeyPressed", keys: ["KeyA"] },
          { name: "selectUp", keys: ["ArrowUp"] },
          { name: "selectDown", keys: ["ArrowDown"] },
          { name: "nextPage", keys: ["ArrowRight"] },
          { name: "select", keys: ["Space"] },
          { name: "closeDialog", keys: ["KeyQ"] },
        ]}
      >
        <Canvas camera={{ position: [10, 2, 5] }} shadows frameloop="demand">
          <ambientLight intensity={1.5} />
          {/* 这两个切换第一还是自由视角  */}
          {/* <OrbitControls />*/}

          <FPV />

          <Physics gravity={[0, 0, 0]}>
            <World />

            <FPScontrols />
          </Physics>
          <EffectComposer>
            <Bloom {...bloom} />
            <DepthOfField
              focusDistance={0.2} // 焦点距离，可以调整
              focalLength={1.5} // 焦距，可以调整
              bokehScale={8} // 虚化程度，可以调整
              height={480} // 渲染分辨率，可以调整
            />

            <N8AO color="#696969" aoRadius={1} intensity={1} />
          </EffectComposer>
        </Canvas>
        <div className="cursor">&#x25CB;</div>
        <GameUI />
        {!showDialogStore && (
          <img
            src="/images/time-frame.png"
            className="time-frame-png"
            alt="Time frame"
          />
        )}
        {showDialogStore && <DialogUI />}
      </KeyboardControls>
    </Suspense>
  );
}
