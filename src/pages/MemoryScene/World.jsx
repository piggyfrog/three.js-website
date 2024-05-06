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
import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";

const World = () => {
  const floorMeterial = useTexture("/secondScene/with-collider/floor.jpeg");
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
    const spotLight = new THREE.SpotLight("#FFF8DC", 300);
    spotLight.position.set(4.5, 10, -8);
    spotLight.angle = Math.PI / 8;
    spotLight.penumbra = 0.3;
    spotLight.castShadow = true;
    spotLightRef.current = spotLight;
    spotLight.target.position.set(4.5, 0, -8);
    scene.add(spotLight);

    const spotLight2 = new THREE.SpotLight("#FFDEAD", 70);
    spotLight2.position.set(-8, 10, -6.5);
    spotLight2.angle = Math.PI / 14;
    spotLight2.penumbra = 0.3;
    spotLight2.castShadow = true;
    spotLightRef.current = spotLight2;
    spotLight2.target.position.set(-8, 0, -6.5);
    scene.add(spotLight2);

    const spotLightHelper = new THREE.SpotLightHelper(spotLight);
    const spotLightHelper2 = new THREE.SpotLightHelper(spotLight2);
    //scene.add(spotLightHelper);

    const ambientLight = new THREE.AmbientLight(2);
    scene.add(ambientLight);
    // 清理函数
    return () => {
      scene.remove(spotLight);
      scene.remove(spotLight2);
      scene.remove(spotLightHelper);
    };
  }, [scene]);
  //

  //@@@@fog@@@@
  useEffect(() => {
    scene.fog = new Fog("#161513", 2, 20);
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

  //@@@@dust@@@@
  function DustParticles() {
    const count = 1000; // 粒子数量
    const particleGeometry = useMemo(() => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3); // 每个粒子有 x, y, z 三个坐标

      for (let i = 0; i < count * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 20; // 随机分布在一个范围内
      }

      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
      return geometry;
    }, [count]);

    const particleMaterial = useMemo(() => {
      return new THREE.PointsMaterial({
        color: "gray",
        size: 0.015,
        sizeAttenuation: true,
      });
    }, []);

    // 让粒子缓慢下落
    useFrame(() => {
      const positions = particleGeometry.attributes.position.array;
      for (let i = 1; i < count * 3; i += 3) {
        positions[i] -= 0.0004; // y 轴下降
        if (positions[i] < -10) {
          positions[i] = 10; // 当粒子落到一定位置时重新出现在顶部
        }
      }
      particleGeometry.attributes.position.needsUpdate = true; // 更新粒子位置
    });

    return <points geometry={particleGeometry} material={particleMaterial} />;
  }
  //
  useEffect(() => {
    const gAction = gAnimated.actions.standstill;
    const mAction = mAnimated.actions.sit;
    mAction.play();
    gAction.play();
  }, []);

  return (
    <>
      <DustParticles />
      <RigidBody type="fixed" friction={0} restitution={0} scale={2}>
        <mesh
          position-y={-0.02}
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
    </>
  );
};

useGLTF.preload("/secondScene/with-collider/wall.glb");
useGLTF.preload("/secondScene/with-collider/room.glb");
useGLTF.preload("/secondScene/with-collider/mom.glb");
useGLTF.preload("/secondScene/with-collider/grandpa.glb");
useGLTF.preload("secondScene/no-collider/room-items.glb");
useGLTF.preload("secondScene/no-collider/transparent.glb");

export default World;
