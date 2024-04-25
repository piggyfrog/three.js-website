import React, { useEffect, useState } from "react";
import { useGLTF, Html } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
export default function CheckbleItemWrapper({
  setShowDialog,
  position,
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
  const showLabelDistance = 3;
  const showLabelFunc = () => {
    const distance = camera.position.distanceTo(itemPosition);
    if (showLabelDistance > distance) {
      setShowLabel(true);
    }
  };
  useEffect(() => {
    console.log(camera.position);
  }, [camera.position]);
  return (
    <mesh
      position={[position.x * 2+0.7, position.y * 2+0.2, position.z * 2+0.3]}
      onPointerOver={showLabelFunc}
      onPointerOut={() => setShowLabel(false)}
    >
      <boxGeometry args={[2.5 * scaleX, 0.5 * scaleY, 1.4 * scaleZ]} />
      {/* 调整透明度到0.001就看不见了 */}
      <meshBasicMaterial color="#ffffff" opacity={0.1} transparent />

      {showLabel && (
        <Html position={[0, 0.8, 0]} wrapperClass="label">
          <img src="/images/check.png" alt="check item" className="checkIcon" style={{ transform: "scale(1.5)", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%) scale(1.5)" }} />
        </Html>
      )}
    </mesh>
  );
}
