import React, { useState } from "react";
import { useGLTF, Html } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export default function Items({ setShowDialog }) {
  const { scene: item } = useGLTF("/TV.glb");
  const [showLabel, setShowLabel] = useState(false);
  return (
    <RigidBody
      type="fixed"
      friction={0}
      restitution={0}
      scale={2}
      position={[2, 2, 0]}
    >
      <primitive
        object={item}
        onPointerOver={() => setShowLabel(true)}
        onPointerOut={() => setShowLabel(false)}
        onClick={() => setShowDialog(true)}
      />
      {showLabel && (
        <Html position={[0, 1, 0]} wrapperClass="label">
          👀
        </Html>
      )}
    </RigidBody>
  );
}

useGLTF.preload("/TV.glb");
