import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";

import { RigidBody } from "@react-three/rapier";
import { useTexture } from "@react-three/drei";
import { useAnimations } from "@react-three/drei";
import * as THREE from "three";
import { useDialogStore } from "../../hooks/store";
import CheckbleItemWrapper from "../../components/CheckbleItemWrapper";
import { useActionStore } from "../../hooks/store";
import { Fog } from "three";
import { useThree } from "@react-three/fiber";
import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";

const World = () => {
  const { scene: floor } = useGLTF("/sandbox/floor.glb");
  floor.scale.set(2, 2, 2);
  const { scene: sky } = useGLTF("/sandbox/sky.glb");
  const { scene: buildings } = useGLTF("/sandbox/buildings.glb");

  const { scene } = useThree();
  //@@@@fog@@@@
  useEffect(() => {
    scene.fog = new Fog("#A69A7C", 1, 300);
    scene.background = new THREE.Color("#A69A7C");
  }, [scene]);
  //
  return (
    <>
      <primitive object={floor} />

      <CheckbleItemWrapper
        dialogID={"sandbox1"}
        onlyPng={true}
        // 是否锁定视角
        lockCamera={false}
        // 需要给一个child的位置
        position={buildings.children[0].position || new THREE.Vector3(0, 0, 0)}
        // 调整透明盒子位置
        offsetX={7}
        offsetY={0}
        offsetZ={20}
        // 调整透明盒子大小
        scaleX={12}
        scaleY={1}
        scaleZ={12}
      />
      <CheckbleItemWrapper
        dialogID={"sandbox2"}
        onlyPng={true}
        // 是否锁定视角
        lockCamera={false}
        // 需要给一个child的位置
        position={buildings.children[3].position || new THREE.Vector3(0, 0, 0)}
        // 调整透明盒子位置
        offsetX={13}
        offsetY={0}
        offsetZ={20}
        // 调整透明盒子大小
        scaleX={1.2}
        scaleY={1}
        scaleZ={4}
      />
      <CheckbleItemWrapper
        dialogID={"sandbox3"}
        onlyPng={true}
        // 是否锁定视角
        lockCamera={false}
        // 需要给一个child的位置
        position={buildings.children[7].position || new THREE.Vector3(0, 0, 0)}
        // 调整透明盒子位置
        offsetX={-2}
        offsetY={-0.3}
        offsetZ={0}
        // 调整透明盒子大小
        scaleX={3.7}
        scaleY={1}
        scaleZ={3.7}
      />
      <CheckbleItemWrapper
        dialogID={"sandbox4"}
        onlyPng={true}
        // 是否锁定视角
        lockCamera={false}
        // 需要给一个child的位置
        position={buildings.children[4].position || new THREE.Vector3(0, 0, 0)}
        // 调整透明盒子位置
        offsetX={9}
        offsetY={0}
        offsetZ={46}
        // 调整透明盒子大小
        scaleX={3}
        scaleY={2}
        scaleZ={6}
      />
      <CheckbleItemWrapper
        dialogID={"sandbox5"}
        onlyPng={true}
        // 是否锁定视角
        lockCamera={false}
        // 需要给一个child的位置
        position={buildings.children[5].position || new THREE.Vector3(0, 0, 0)}
        // 调整透明盒子位置
        offsetX={1}
        offsetY={0}
        offsetZ={1}
        // 调整透明盒子大小
        scaleX={14}
        scaleY={1}
        scaleZ={1.2}
      />
      <CheckbleItemWrapper
        dialogID={"sandbox6"}
        onlyPng={true}
        // 是否锁定视角
        lockCamera={false}
        // 需要给一个child的位置
        position={buildings.children[6].position || new THREE.Vector3(0, 0, 0)}
        // 调整透明盒子位置
        offsetX={9.5}
        offsetY={0.2}
        offsetZ={-1}
        // 调整透明盒子大小
        scaleX={1.2}
        scaleY={2}
        scaleZ={1.5}
      />
      <CheckbleItemWrapper
        dialogID={"sandbox7"}
        onlyPng={true}
        // 是否锁定视角
        lockCamera={false}
        // 需要给一个child的位置
        position={buildings.children[2].position || new THREE.Vector3(0, 0, 0)}
        // 调整透明盒子位置
        offsetX={0}
        offsetY={0}
        offsetZ={-1}
        // 调整透明盒子大小
        scaleX={4}
        scaleY={1}
        scaleZ={4}
      />
      <CheckbleItemWrapper
        dialogID={"sandbox8"}
        onlyPng={true}
        // 是否锁定视角
        lockCamera={false}
        // 需要给一个child的位置
        position={buildings.children[1].position || new THREE.Vector3(0, 0, 0)}
        // 调整透明盒子位置
        offsetX={-12}
        offsetY={0}
        offsetZ={49}
        // 调整透明盒子大小
        scaleX={4}
        scaleY={2}
        scaleZ={6}
      />
      <CheckbleItemWrapper
        dialogID={"sandbox9"}
        onlyPng={true}
        // 是否锁定视角
        lockCamera={false}
        // 需要给一个child的位置
        position={buildings.children[8].position || new THREE.Vector3(0, 0, 0)}
        // 调整透明盒子位置
        offsetX={3}
        offsetY={0}
        offsetZ={-11}
        // 调整透明盒子大小
        scaleX={2}
        scaleY={2}
        scaleZ={3}
      />
      <CheckbleItemWrapper
        dialogID={"sandbox10"}
        onlyPng={true}
        // 是否锁定视角
        lockCamera={false}
        // 需要给一个child的位置
        position={buildings.children[9].position || new THREE.Vector3(0, 0, 0)}
        // 调整透明盒子位置
        offsetX={-10}
        offsetY={1}
        offsetZ={30}
        // 调整透明盒子大小
        scaleX={20}
        scaleY={1}
        scaleZ={40}
      />
      <primitive object={sky} scale={[2, 2, 2]} />
      <primitive object={buildings} scale={[2, 2, 2]} />
    </>
  );
};

useGLTF.preload("/sandbox/floor.glb");
useGLTF.preload("/sandbox/sky.glb");
useGLTF.preload("/sandbox/buildings.glb");

export default World;
