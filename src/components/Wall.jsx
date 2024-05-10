import React, { useRef,useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";
export default function Wall(props) {
  const { scene } = useGLTF("/wall.glb");
  const { scene: roofScene } = useGLTF("/roof.glb");
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        // 为隐藏的对象设置一种不参与渲染的材料
        child.material = new THREE.MeshBasicMaterial({
          visible: false, // 完全不渲染这个材料
          side: THREE.DoubleSide // 确保所有面都不渲染
        });
      }
    });
  }, [scene]);
  return (
    <RigidBody type="fixed" friction={0} restitution={0} scale={2}>
      <primitive object={scene} />
      <primitive object={roofScene} />
    </RigidBody>
  );
}

useGLTF.preload("/wall.glb");
useGLTF.preload("/roof.glb");
