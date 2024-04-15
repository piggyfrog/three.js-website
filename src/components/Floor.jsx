import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export default function Floor(props) {
  const { scene } = useGLTF("/floor.glb");
  return (
    <RigidBody type="fixed" friction={0} restitution={0} scale={2}>
      <primitive object={scene} />
    </RigidBody>
  );
}

useGLTF.preload("/floor.glb");
