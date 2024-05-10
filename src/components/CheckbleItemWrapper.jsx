import React, { useEffect, useState } from "react";
import { useGLTF, Html } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useThree } from "@react-three/fiber";
import { useTranslation } from "react-i18next";
import * as THREE from "three";
import { useGameStateStore, useDialogStore } from "../hooks/store";
import {
  useLockCameraStore,
  useActionStore,
  useShowPngStore,
} from "../hooks/store";
import { set } from "layer";

export default function CheckbleItemWrapper({
  isCheck = true,
  lockCamera = false,
  onlyPng = false,
  position,
  dialogID,
  offsetX = 0,
  offsetY = 0,
  offsetZ = 0,
  scaleX = 1,
  scaleY = 1,
  scaleZ = 1,
}) {
  const [showLabel, setShowLabel] = useState(false);
  const { camera } = useThree();
  const itemPosition = new THREE.Vector3(
    position.x * 2,
    position.y * 2,
    position.z * 2
  );
  // 距离小于6的时候显示label
  const showLabelDistance = 6;
  const updateGameState = useGameStateStore((state) => state.setGameState);
  const setLockCamera = useLockCameraStore((state) => state.setLockCamera);
  const setAction = useActionStore((state) => state.setAction);
  const setShowDialog = useDialogStore((state) => state.setOpen);
  const setShowPng = useShowPngStore((state) => state.setShow);
  const setPngPath = useShowPngStore((state) => state.setPngPath);

  const showLabelFunc = () => {
    if (!onlyPng) {
      const distance = camera.position.distanceTo(itemPosition);
      if (showLabelDistance > distance) {
        setShowLabel(true);
      }
    } else {
      setShowLabel(true);
    }
  };

  const showDialogFunc = () => {
    if (onlyPng) {
      setShowPng(true);
      setPngPath(`/images/${dialogID}.png`);
      return;
    }
    const distance = camera.position.distanceTo(itemPosition);
    if (showLabelDistance > distance) {
      setShowDialog(dialogID);
      updateGameState(dialogID);
      if (lockCamera) {
        setLockCamera(true);
      }
      if (dialogID.includes("album")) {
        console.log("showAlbum");
        setAction("showAlbum");
      }
    }
  };

  const getLabel = () => {
    if (onlyPng) {
      return `/images/${dialogID}-label.png`;
    }
    return isCheck ? "/images/check.png" : "/images/talk.png";
  };

  return (
    <mesh
      position={[
        position.x * 2 + offsetX,
        position.y * 2 + offsetY,
        position.z * 2 + offsetZ,
      ]}
      onPointerOver={showLabelFunc}
      onPointerOut={() => setShowLabel(false)}
      onClick={showDialogFunc}
      // visible={false}  // 直接设置mesh为不可见
    >
      <boxGeometry args={[scaleX, scaleY, scaleZ]} />
      {/* 调整透明度到0.001就看不见了 */}
      <meshBasicMaterial color="red" opacity={0.1} transparent />

      {showLabel && (
        <Html position={[0, Math.max(scaleY / 2, 0.3), 0]} wrapperClass="label">
          <img src={getLabel()} alt="check item" className="checkIcon" />
        </Html>
      )}
    </mesh>
  );
}
