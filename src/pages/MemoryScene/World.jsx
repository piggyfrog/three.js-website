import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { Suspense } from "react";
import Loader from "../../components/Loader";
const World = ({ setShowDialog }) => {
  const { scene } = useGLTF("floor.glb");
  const { scene: WallScene } = useGLTF("/secondScene/wall.glb");
  const { scene: FixedItemsScene } = useGLTF("/secondScene/items.glb");
  return (
    <Suspense fallback={<Loader />}>
      <RigidBody type="fixed" friction={0} restitution={0} scale={2}>
        <primitive object={scene} />
      </RigidBody>
      {/* <RigidBody type="fixed" friction={0} restitution={0} scale={2}>
        <primitive object={WallScene} />
      </RigidBody>
      <RigidBody type="fixed" friction={0} restitution={0} scale={2}>
        <primitive object={FixedItemsScene} />
      </RigidBody> */}
    </Suspense>
  );
};
useGLTF.preload("/secondScene/floor.glb");
useGLTF.preload("/secondScene/wall.glb");
useGLTF.preload("/secondScene/items.glb");

export default World;
