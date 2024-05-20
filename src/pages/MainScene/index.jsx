import React, { useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { KeyboardControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import World from "./World.jsx";
import FPScontrols from "../../components/FPScontrols.jsx";
import FPV from "../../components/FPV.jsx";
import DialogUI from "../../components/DialogUI.jsx";
import GameUI from "../../components/GameUI.jsx";
import { GUI } from "dat.gui";


import {
  EffectComposer,
  DepthOfField,
  N8AO,
  Bloom,
} from "@react-three/postprocessing";
import { Suspense } from "react";
import Loader from "../../components/Loader.jsx";
import {
  useDialogStore,
  useGameStateStore,
  useActionStore,
  usePlayerLocationStore,
  useLockCameraStore,
} from "../../hooks/store.js";
import FlipPhoto from "../../components/flipPhoto.jsx";
import { useNavigate } from "react-router";

export default function MemoryScene() {
  const showDialogStore = useDialogStore((state) => state.isOpen);
  const useGameState = useGameStateStore((state) => state.gameState);
  const setShouldSave = usePlayerLocationStore((state) => state.setShouldSave);
  const setLockCamera = useLockCameraStore((state) => state.setLockCamera);
  const [showFotos, setShowFotos] = useState(false);
  const photos = ["photo10", "photo9", "photo8", "photo7", "photo6"]; //添加照片
  const action = useActionStore((state) => state.action);
  const navigate = useNavigate();

  const [focusDistance, setFocusDistance] = useState(4);
  const [focalLength, setFocalLength] = useState(40);
  const gui = useRef();

  /*useEffect(() => {
    gui.current = new GUI();
    gui.current
      .add({ focusDistance }, "focusDistance", 0, 10)
      .onChange(setFocusDistance);
    gui.current
      .add({ focalLength }, "focalLength", 0.1, 100)
      .onChange(setFocalLength);

    return () => gui.current.destroy();
  }, []);
  */

  useEffect(() => {
    console.log("gameState", useGameState);
  }, [useGameState]);

  useEffect(() => {
    if (action === "changeMemoryScene") {
      setShouldSave(true);
      setLockCamera(false);
      navigate("/memory");
    } else if (action === "changeThirdScene") {
      setShouldSave(true);
      navigate("/third");
    } else if (action === "changeVideo1Scene") {
      setShouldSave(true);
      navigate("/video1");
    } else if (action === "changeEndingScene") {
      setShouldSave(true);
      navigate("/end");
    } else if (action === "changeVideo2Scene") {
      setShouldSave(true);
      navigate("/video2");
    }
    if (action === "showAlbum") {
      setShowFotos(true);
    } else {
      setShowFotos(false);
    }
  }, [action]);

  return (
    <Suspense fallback={<Loader text="loading-main" />}>
      <Canvas camera={{ position: [5, 5, 20] }} shadows frameloop="demand">
        <ambientLight intensity={0.5} />
        {/* 这两个切换第一还是自由视角  */}
        {/* <OrbitControls />*/}

        <directionalLight intensity={1} position={[2, 7, 7]} />
        <directionalLight intensity={0.5} position={[-2, -7, -3]} />

        <FPV />

        <Physics gravity={[0, 0, 0]}>
          <World />

          <FPScontrols />
        </Physics>
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.001} // 控制从哪个亮度值开始应用泛光
            luminanceSmoothing={0.5} // 泛光的平滑度，较低的值会使泛光效果更尖锐
            intensity={0.9} // 泛光的强度
          />
          <DepthOfField
            focusDistance={focusDistance}
            focalLength={focalLength}
            bokehScale={18}
            height={516}
          />

          <N8AO color="#50463b" aoRadius={1} intensity={2} />
        </EffectComposer>
      </Canvas>
      <div className="cursor">&#x25CB;</div>
      <GameUI />
      {!showDialogStore && (
        <img
          src="/images/time-frame-1.png"
          className="time-frame-png"
          alt="Time frame"
        />
      )}
      {showDialogStore && <DialogUI />}
      {showFotos && (
        <div className="item-pic-background">
          {photos.map((photo, index) => (
            <FlipPhoto photo={photo} key={index} index={index} />
          ))}
        </div>
      )}
    </Suspense>
  );
}
