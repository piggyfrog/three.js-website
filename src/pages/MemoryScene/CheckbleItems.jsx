import CheckbleItemWrapper from "../../components/CheckbleItemWrapper";
import { useGLTF } from "@react-three/drei";
import { useState } from "react";
import { RigidBody } from "@react-three/rapier";
import { Html } from "@react-three/drei";
import * as THREE from "three";
const Items = ({ setShowDialog }) => {
  const { scene: Album } = useGLTF("secondScene/no-collider/album.glb");
  const { scene: Camera } = useGLTF("secondScene/no-collider/camera.glb");
  const { scene: Diary } = useGLTF("secondScene/no-collider/diary.glb");
  const { scene: Fruit } = useGLTF("secondScene/no-collider/fruit.glb");
  return (
    <>
      <primitive object={Fruit} scale={2} />
      <CheckbleItemWrapper
        setShowDialog={setShowDialog}
        // 需要给一个child的位置
        position={Fruit.children[6].position || new THREE.Vector3(0, 0, 0)}
        // 调整透明盒子大小
        scaleX={1}
        scaleZ={1}
      />
    </>
  );
};

export default Items;
