import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { Suspense } from "react";
import Loader from "../../components/Loader";
import { useAnimations } from "@react-three/drei";
import { useTexture } from "@react-three/drei";
import { Fog } from "three";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
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

  const spotLightRef = useRef(); // 创建一个引用以访问spotLight
  const { scene } = useThree();
  //@@@@lights@@@@

  useEffect(() => {
    const spotLight = new THREE.SpotLight("#FFF8DC", 200);
    spotLight.position.set(4.5, 10, -8);
    spotLight.angle = Math.PI / 8;
    spotLight.penumbra = 0.3;
    spotLight.castShadow = true;
    spotLightRef.current = spotLight;
    spotLight.target.position.set(4.5, 0, -8);
    scene.add(spotLight);

    const spotLightHelper = new THREE.SpotLightHelper(spotLight);
    //scene.add(spotLightHelper);

    // 清理函数
    return () => {
      scene.remove(spotLight);
      scene.remove(spotLightHelper);
    };
  }, [scene]);
  //

  //@@@@fog@@@@
  useEffect(() => {
    scene.fog = new Fog("#161513", 3, 20);
    scene.background = new THREE.Color("#161513");
  }, [scene]);
  //

  //import other glb

  const { scene: RoomItems } = useGLTF(
    "secondScene/no-collider/room-items.glb"
  );
  const { scene: Transparent } = useGLTF(
    "secondScene/no-collider/transparent.glb"
  );

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
          <meshStandardMaterial
            attach={"material"}
            map={floorMeterial}
            map-repeat={[1, -1]}
            map-offset={[0, 1]}
          />
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
      <primitive object={RoomItems} scale={[2, 2, 2]} />
      <primitive object={Transparent} scale={[2, 2, 2]} />
    </Suspense>
  );
};
// useGLTF.preload("/secondScene/floor.glb");
// useGLTF.preload("/secondScene/wall.glb");
// useGLTF.preload("/secondScene/items.glb");

export default World;
