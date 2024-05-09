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
import { t } from "i18next";

const World = () => {
  const floorMeterial2 = useTexture("/images/diban.png");
  const dustTexture = useTexture("/images/glow.png");
  const { scene: WallScene } = useGLTF("/thirdScene/with-collider/yangtai.glb");
  const { scene: item1 } = useGLTF("/thirdScene/no-collider/item1.glb");
  const { scene: item2 } = useGLTF("/thirdScene/no-collider/item2.glb");
  const { scene: laoye, animations: laoyeAnimations } = useGLTF(
    "/thirdScene/with-collider/laoye-back.glb"
  );

  const { scene: grass, animations: grassAnimations } = useGLTF(
    "thirdScene/no-collider/grass.glb"
  );
  const { scene: laolao, animations: laoAnimations } = useGLTF(
    "thirdScene/no-collider/laolao.glb"
  );
  const lAnimated = useAnimations(laoAnimations, laolao);
  const laoyeAnimated = useAnimations(laoyeAnimations, laoye);
  const gAnimated = useAnimations(grassAnimations, grass);
  const setShowDialog = useDialogStore((state) => state.setOpen);
  const actionStore = useActionStore((state) => state.action);

  const spotLightRef = useRef(); // 创建一个引用以访问spotLight
  const { scene } = useThree();
  useEffect(() => {
    const lAction = lAnimated.actions.look;
    const laoyeAction = laoyeAnimated.actions.ldle;
    laoyeAction.play();
    lAction.play();
  }, []);

  //@@@@lights@@@@

  useEffect(() => {
    const spotLight3 = new THREE.SpotLight("#FFF8DC", 200);
    spotLight3.position.set(4.5, 10, -7);
    spotLight3.angle = Math.PI / 14;
    spotLight3.penumbra = 0.8;
    spotLight3.castShadow = true;
    spotLightRef.current = spotLight3;
    spotLight3.target.position.set(4.5, 0, -7);
    scene.add(spotLight3);

    const spotLight4 = new THREE.SpotLight("#FFDEAD", 400);
    spotLight4.position.set(-10, 10, -6.5);
    spotLight4.angle = Math.PI / 6;
    spotLight4.penumbra = 0.5;
    spotLight4.castShadow = true;
    spotLightRef.current = spotLight4;
    spotLight4.target.position.set(-10, 0, -6.5);
    scene.add(spotLight4);

    const spotLightHelper3 = new THREE.SpotLightHelper(spotLight3);
    const spotLightHelper4 = new THREE.SpotLightHelper(spotLight4);
    //scene.add(spotLightHelper4);

    const ambientLight = new THREE.AmbientLight(2);
    scene.add(ambientLight);
    // 清理函数
    return () => {
      scene.remove(spotLight3);
      scene.remove(spotLight4);
      scene.remove(spotLightHelper);
    };
  }, [scene]);
  //
  //@@@@fog@@@@
  useEffect(() => {
    scene.fog = new Fog("#161513", 4, 20);
    scene.background = new THREE.Color("#161513");
  }, [scene]);
  //

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
        map: dustTexture,
        transparent: true,
        depthWrite: false,
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
    if (actionStore === "playLaoLaoAnimation") {
      const lAction = lAnimated.actions.idle;
      lAction.setLoop(THREE.LoopOnce);
      lAction.clampWhenFinished = true;
      lAction.play();
      gAnimated.names.forEach((clip) => {
        const action = gAnimated.actions[clip];
        action.setLoop(THREE.LoopOnce);
        action.clampWhenFinished = true;
        action.play();
      });
      setShowDialog("laolao2");
    }
  }, [actionStore]);

  return (
    <>
      <DustParticles />
      <RigidBody type="fixed" friction={0} restitution={0} scale={2}>
        <mesh
          position-y={-0.02}
          rotation-x={-Math.PI * 0.5}
          rotateZ={Math.PI}
          scale={20}
        >
          <planeGeometry />
          <meshStandardMaterial
            attach={"material"}
            map={floorMeterial2}
            map-repeat={[1, -1]}
            map-offset={[0, 1]}
          />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" friction={0} restitution={0} scale={2}>
        <primitive object={WallScene} />
      </RigidBody>
      <primitive object={laoye} scale={[2, 2, 2]} />
      <CheckbleItemWrapper
        dialogID={"laoyeback"}
        isCheck={false}
        // 是否锁定视角
        lockCamera={false}
        // 需要给一个child的位置
        position={laoye.children[0].position || new THREE.Vector3(0, 0, 0)}
        // 调整透明盒子位置
        offsetX={0}
        offsetY={1}
        offsetZ={0}
        // 调整透明盒子大小
        scaleX={1.2}
        scaleY={6.2}
        scaleZ={1.2}
      />
      <primitive object={item1} scale={[2, 2, 2]} />
      <primitive object={item2} scale={[2, 2, 2]} />
      <primitive object={laolao} scale={[2, 2, 2]} />
      <CheckbleItemWrapper
        dialogID={"laolao"}
        // 是否锁定视角
        lockCamera={false}
        isCheck={true}
        // 需要给一个child的位置
        position={laolao.children[0].position || new THREE.Vector3(0, 0, 0)}
        // 调整透明盒子位置
        offsetX={0}
        offsetY={1}
        offsetZ={0.4}
        // 调整透明盒子大小
        scaleX={1}
        scaleY={6}
        scaleZ={0.8}
      />
      <primitive object={grass} scale={[2, 2, 2]} />
    </>
  );
};

useGLTF.preload("/thirdScene/with-collider/yangtai.glb");
useGLTF.preload("/thirdScene/no-collider/item1.glb");
useGLTF.preload("/thirdScene/no-collider/item2.glb");
useGLTF.preload("/thirdScene/with-collider/laoye-back.glb");
useGLTF.preload("/thirdScene/no-collider/grass.glb");
useGLTF.preload("/thirdScene/no-collider/laolao.glb");

export default World;
