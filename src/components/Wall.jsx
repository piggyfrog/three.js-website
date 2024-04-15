import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
export default function Wall(props) {
  const { scene } = useGLTF("/wall.glb");
  const { scene: roofScene } = useGLTF("/roof.glb");
  return (
    <RigidBody type="fixed" friction={0} restitution={0} scale={2}>
      <primitive object={scene} />
      <primitive object={roofScene} />
    </RigidBody>
  );
}

useGLTF.preload("/wall.glb");
useGLTF.preload("/roof.glb");
