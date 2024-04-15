import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export default function FixedItems(props) {
  const { scene } = useGLTF("/main-scene-items.glb");
  return (
    <RigidBody type="fixed" friction={0} restitution={0} scale={2}>
      <primitive object={scene} />
    </RigidBody>
  );
}

useGLTF.preload("/main-scene-items.glb");
