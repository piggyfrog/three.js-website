import { TransformControls, OrbitControls, Stage } from "@react-three/drei";
import { useRef } from "react";
import { Perf } from "r3f-perf";
import { useControls } from "leva";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";
import Player from "./Player";
import Character from "./Character2";

export default function Experience({ camera }) {
  const { perfVisible } = useControls({ perfVisible: true });
  const { scene } = useGLTF("./room3.glb");
  return (
    <>
      {perfVisible && <Perf position="top-left" />}
      <OrbitControls />
      <Stage center={{ disable: true }}>
        <Physics>
          <RigidBody type="fixed">
            <primitive object={scene} scale={10} />
          </RigidBody>
        </Physics>
        <Character camera={camera} />
        <Player />
      </Stage>
    </>
  );
}
