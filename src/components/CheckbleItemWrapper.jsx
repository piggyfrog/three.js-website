import React, { useState } from "react";
import { useGLTF, Html } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export default function CheckbleItemWrapper({
  setShowDialog,
  position,
  scaleX = 1,
  scaleY = 1,
  scaleZ = 1,
}) {
  const [showLabel, setShowLabel] = useState(false);
  return (
    <mesh
      position={[position.x * 2, position.y * 2, position.z * 2]}
      onPointerOver={() => setShowLabel(true)}
      onPointerOut={() => setShowLabel(false)}
    >
      <boxGeometry args={[0.5 * scaleX, 0.5 * scaleY, 0.5 * scaleZ]} />
      {/* 调整透明度到0.001就看不见了 */}
      <meshBasicMaterial color="#ffffff" opacity={0.1} transparent />

      {showLabel && (
        <Html position={[0, 0.5, 0]} wrapperClass="label">
          <img src="/images/check.png" alt="check item" className="checkIcon" />
        </Html>
      )}
    </mesh>
  );
}
