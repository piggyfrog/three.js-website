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
import {
  EffectComposer,
  DepthOfField,
  N8AO,
  Bloom,
} from "@react-three/postprocessing";
import { useNavigate } from "react-router";
import {
  useActionStore,
  useShowPngStore,
  usePlayerLocationStore,
} from "../../hooks/store.js";

export default function SandboxScene() {
  const showPng = useShowPngStore((state) => state.show);
  const setShowPng = useShowPngStore((state) => state.setShow);
  const pngPath = useShowPngStore((state) => state.pngPath);
  const setShouldLoad = usePlayerLocationStore((state) => state.setShouldLoad);
  const [sub, get] = useKeyboardControls();
  const action = useActionStore((state) => state.action);
  const setAction = useActionStore((state) => state.setAction);
  const navigate = useNavigate();

  useEffect(() => {
    if (action === "changeMemoryScene") {
      setShouldLoad("memory");
      navigate("/memory");
    }
  }, [action]);

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
        camera={{ position: [5, 28, 15], fov: 35 }}
        shadows
        frameloop="demand"
      >
        <ambientLight intensity={1.5} />
        <OrbitControls target={[10, 0, 0]} />

        <World />
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.001} // 控制从哪个亮度值开始应用泛光
            luminanceSmoothing={0.8} // 泛光的平滑度，较低的值会使泛光效果更尖锐
            intensity={3} // 泛光的强度
          />

          <N8AO color="#696969" aoRadius={1} intensity={1} />
        </EffectComposer>
      </Canvas>

      <GameUI />
      {showPng && (
        <div className="item-pic-background">
          <img src={pngPath} alt="item" className="item-img" />
        </div>
      )}
      <img
        src="/images/check.png"
        alt="back"
        className="sandbox-box-png"
        onClick={() => {
          setAction("");
          setShouldLoad("memory");
          navigate("/memory");
        }}
      />
    </Suspense>
  );
}
