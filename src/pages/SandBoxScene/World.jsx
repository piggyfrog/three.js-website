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
  const { scene: sky } = useGLTF("/sandbox/sky.glb");
  const { scene: buildings } = useGLTF("/sandbox/buildings.glb");
  return (
    <>
      <primitive object={floor} />

      <CheckbleItemWrapper
        dialogID={"radio"}
        onlyPng={true}
        // 是否锁定视角
        lockCamera={false}
        // 需要给一个child的位置
        position={buildings.children[0].position || new THREE.Vector3(0, 0, 0)}
        // 调整透明盒子位置
        offsetX={0}
        offsetY={1}
        offsetZ={0}
        // 调整透明盒子大小
        scaleX={1.2}
        scaleY={6.2}
        scaleZ={1.2}
      />
      <CheckbleItemWrapper
        dialogID={"radio"}
        onlyPng={true}
        // 是否锁定视角
        lockCamera={false}
        // 需要给一个child的位置
        position={buildings.children[3].position || new THREE.Vector3(0, 0, 0)}
        // 调整透明盒子位置
        offsetX={0}
        offsetY={1}
        offsetZ={0}
        // 调整透明盒子大小
        scaleX={1.2}
        scaleY={6.2}
        scaleZ={1.2}
      />
      <CheckbleItemWrapper
        dialogID={"radio"}
        onlyPng={true}
        // 是否锁定视角
        lockCamera={false}
        // 需要给一个child的位置
        position={buildings.children[7].position || new THREE.Vector3(0, 0, 0)}
        // 调整透明盒子位置
        offsetX={0}
        offsetY={1}
        offsetZ={0}
        // 调整透明盒子大小
        scaleX={1.2}
        scaleY={6.2}
        scaleZ={1.2}
      />
      <CheckbleItemWrapper
        dialogID={"radio"}
        onlyPng={true}
        // 是否锁定视角
        lockCamera={false}
        // 需要给一个child的位置
        position={buildings.children[4].position || new THREE.Vector3(0, 0, 0)}
        // 调整透明盒子位置
        offsetX={0}
        offsetY={1}
        offsetZ={0}
        // 调整透明盒子大小
        scaleX={1.2}
        scaleY={6.2}
        scaleZ={1.2}
      />
      <CheckbleItemWrapper
        dialogID={"radio"}
        onlyPng={true}
        // 是否锁定视角
        lockCamera={false}
        // 需要给一个child的位置
        position={buildings.children[5].position || new THREE.Vector3(0, 0, 0)}
        // 调整透明盒子位置
        offsetX={0}
        offsetY={1}
        offsetZ={0}
        // 调整透明盒子大小
        scaleX={1.2}
        scaleY={6.2}
        scaleZ={1.2}
      />
      <CheckbleItemWrapper
        dialogID={"radio"}
        onlyPng={true}
        // 是否锁定视角
        lockCamera={false}
        // 需要给一个child的位置
        position={buildings.children[6].position || new THREE.Vector3(0, 0, 0)}
        // 调整透明盒子位置
        offsetX={0}
        offsetY={1}
        offsetZ={0}
        // 调整透明盒子大小
        scaleX={1.2}
        scaleY={6.2}
        scaleZ={1.2}
      />
      <CheckbleItemWrapper
        dialogID={"radio"}
        onlyPng={true}
        // 是否锁定视角
        lockCamera={false}
        // 需要给一个child的位置
        position={buildings.children[2].position || new THREE.Vector3(0, 0, 0)}
        // 调整透明盒子位置
        offsetX={0}
        offsetY={1}
        offsetZ={0}
        // 调整透明盒子大小
        scaleX={1.2}
        scaleY={6.2}
        scaleZ={1.2}
      />
      <CheckbleItemWrapper
        dialogID={"radio"}
        onlyPng={true}
        // 是否锁定视角
        lockCamera={false}
        // 需要给一个child的位置
        position={buildings.children[1].position || new THREE.Vector3(0, 0, 0)}
        // 调整透明盒子位置
        offsetX={0}
        offsetY={1}
        offsetZ={0}
        // 调整透明盒子大小
        scaleX={1.2}
        scaleY={6.2}
        scaleZ={1.2}
      />
      <CheckbleItemWrapper
        dialogID={"radio"}
        onlyPng={true}
        // 是否锁定视角
        lockCamera={false}
        // 需要给一个child的位置
        position={buildings.children[8].position || new THREE.Vector3(0, 0, 0)}
        // 调整透明盒子位置
        offsetX={0}
        offsetY={1}
        offsetZ={0}
        // 调整透明盒子大小
        scaleX={1.2}
        scaleY={6.2}
        scaleZ={1.2}
      />
      <CheckbleItemWrapper
        dialogID={"radio"}
        onlyPng={true}
        // 是否锁定视角
        lockCamera={false}
        // 需要给一个child的位置
        position={buildings.children[9].position || new THREE.Vector3(0, 0, 0)}
        // 调整透明盒子位置
        offsetX={0}
        offsetY={1}
        offsetZ={0}
        // 调整透明盒子大小
        scaleX={1.2}
        scaleY={6.2}
        scaleZ={1.2}
      />
      <CheckbleItemWrapper
        dialogID={"radio"}
        onlyPng={true}
        // 是否锁定视角
        lockCamera={false}
        // 需要给一个child的位置
        position={buildings.children[10].position || new THREE.Vector3(0, 0, 0)}
        // 调整透明盒子位置
        offsetX={0}
        offsetY={1}
        offsetZ={0}
        // 调整透明盒子大小
        scaleX={1.2}
        scaleY={6.2}
        scaleZ={1.2}
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
