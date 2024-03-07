import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
export default function Items(props) {
  const { scene: itemScene1 } = useGLTF("/items1.glb");
  const { scene: itemScene2 } = useGLTF("/items2.glb");
  return (
    <RigidBody type="fixed" friction={0} restitution={0} scale={2}>
      <primitive object={itemScene1} />
      <primitive object={itemScene2} />
    </RigidBody>
  );
}

useGLTF.preload("/items1.glb");
useGLTF.preload("/items2.glb");
