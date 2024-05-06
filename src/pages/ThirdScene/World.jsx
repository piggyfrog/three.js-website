import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useTexture } from "@react-three/drei";
import { useAnimations } from "@react-three/drei";
import * as THREE from "three";
import { useDialogStore } from "../../hooks/store";
import CheckbleItemWrapper from "../../components/CheckbleItemWrapper";
import { useActionStore } from "../../hooks/store";

const World = () => {
  const floorMeterial = useTexture("/secondScene/with-collider/floor.jpeg");
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
  useEffect(() => {
    const lAction = lAnimated.actions.look;
    const laoyeAction = laoyeAnimated.actions.ldle;
    laoyeAction.play();
    lAction.play();
  }, []);

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
            map={floorMeterial}
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
        offsetZ={0.4}
        // 调整透明盒子大小
        scaleX={1}
        scaleY={4}
        scaleZ={0.8}
      />
      <primitive object={item1} scale={[2, 2, 2]} />
      <primitive object={item2} scale={[2, 2, 2]} />
      <primitive object={laolao} scale={[2, 2, 2]} />
      <CheckbleItemWrapper
        dialogID={"laolao"}
        // 是否锁定视角
        lockCamera={false}
        isCheck={false}
        // 需要给一个child的位置
        position={laolao.children[0].position || new THREE.Vector3(0, 0, 0)}
        // 调整透明盒子位置
        offsetX={0}
        offsetY={1}
        offsetZ={0.4}
        // 调整透明盒子大小
        scaleX={1}
        scaleY={4}
        scaleZ={0.8}
      />
      <primitive object={grass} scale={[2, 2, 2]} />
    </>
  );
};

useGLTF.preload("/thirdScene/with-collider/yangtai.glb");

export default World;
