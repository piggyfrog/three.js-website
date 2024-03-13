import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
export default function Items(props) {
  const { scene: itemScene1 } = useGLTF("/itemsWhite.glb");
  return (
    <RigidBody type="fixed" friction={0} restitution={0} scale={2}>
      <primitive object={itemScene1} />
    </RigidBody>
  );
}

useGLTF.preload("/itemsWhite.glb");
