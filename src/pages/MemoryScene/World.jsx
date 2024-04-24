import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { Suspense } from "react";
import Loader from "../../components/Loader";
import { useAnimations } from "@react-three/drei";
import { useTexture } from "@react-three/drei";
const World = ({ setShowDialog }) => {
  const floorMeterial = useTexture("/secondScene/with-collider/floor.jpeg");
  const { nodes, materials } = useGLTF("/secondScene/with-collider/floor.glb");
  const { scene: WallScene } = useGLTF("secondScene/with-collider/wall.glb");
  const { scene: FixedItemsScene } = useGLTF(
    "secondScene/with-collider/room.glb"
  );
  const { scene: mom, animations: monAnimations } = useGLTF(
    "secondScene/with-collider/mom.glb"
  );
  const { scene: grandpa, animations: grandpaAnimations } = useGLTF(
    "secondScene/with-collider/grandpa.glb"
  );
  const gAnimated = useAnimations(grandpaAnimations, grandpa);
  const mAnimated = useAnimations(monAnimations, mom);
  console.log(mAnimated);
  console.log(gAnimated);
  useEffect(() => {
    const gAction = gAnimated.actions.standstill;
    const mAction = mAnimated.actions.sit;
    mAction.play();
    gAction.play();
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      <RigidBody type="fixed" friction={0} restitution={0} scale={2}>
        <mesh
          position-y={0}
          rotation-x={-Math.PI * 0.5}
          rotateZ={Math.PI}
          scale={15}
        >
          <planeGeometry />
          <meshBasicMaterial attach={"material"} map={floorMeterial} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" friction={0} restitution={0} scale={2}>
        <primitive object={WallScene} />
      </RigidBody>
      <RigidBody type="fixed" friction={0} restitution={0} scale={2}>
        <primitive object={FixedItemsScene} />
      </RigidBody>
      <RigidBody type="fixed" friction={0} restitution={0} scale={2}>
        <primitive object={mom} />
      </RigidBody>
      <RigidBody type="fixed" friction={0} restitution={0} scale={2}>
        <primitive object={grandpa} />
      </RigidBody>
    </Suspense>
  );
};
// useGLTF.preload("/secondScene/floor.glb");
// useGLTF.preload("/secondScene/wall.glb");
// useGLTF.preload("/secondScene/items.glb");

export default World;
