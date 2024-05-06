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
import {
  useDialogStore,
  useGameStateStore,
  useActionStore,
  usePlayerLocationStore,
} from "../../hooks/store.js";
import FlipPhoto from "../../components/flipPhoto.jsx";
import { useNavigate } from "react-router";

export default function MemoryScene() {
  const showDialogStore = useDialogStore((state) => state.isOpen);
  const useGameState = useGameStateStore((state) => state.gameState);
  const setShouldSave = usePlayerLocationStore((state) => state.setShouldSave);
  const [showFotos, setShowFotos] = useState(false);
  const photos = ["foto1"]; //添加照片
  const action = useActionStore((state) => state.action);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("gameState", useGameState);
  }, [useGameState]);

  useEffect(() => {
    if (action === "ChangeScene3") {
      setShouldSave(true);
      navigate("/third");
    }
    if (action === "showAlbum") {
      setShowFotos(true);
    } else {
      setShowFotos(false);
    }
  }, [action]);

  return (
    <Suspense fallback={<Loader />}>
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
        <Canvas camera={{ position: [0, -10, 5] }} shadows frameloop="demand">
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
        {showFotos && (
          <div className="item-pic-background">
            {photos.map((photo, index) => (
              <FlipPhoto photo={photo} key={index} index={index} />
            ))}
          </div>
        )}
      </KeyboardControls>
    </Suspense>
  );
}
