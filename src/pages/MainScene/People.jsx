import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useTexture } from "@react-three/drei";
import { useAnimations } from "@react-three/drei";
import * as THREE from "three";
import { useDialogStore } from "../../hooks/store";
import CheckbleItemWrapper from "../../components/CheckbleItemWrapper";
import { useActionStore } from "../../hooks/store";

const MainScenePeople = () => {
  const { scene: grandMa, animations: grandMaAnimations } =
    useGLTF("grandma.glb");
  const gMaAnimated = useAnimations(grandMaAnimations, grandMa);
  const { scene: grandPa, animations: grandPaAnimations } =
    useGLTF("grandpa.glb");
  const gPaAnimated = useAnimations(grandPaAnimations, grandPa);
  const { scene: mom, animations: momAnimations } = useGLTF("mama.glb");
  const momAnimated = useAnimations(momAnimations, mom);
  const { scene: uncle, animations: uncleAnimations } = useGLTF("uncle.glb");
  const uncleAnimated = useAnimations(uncleAnimations, uncle);
  const setShowDialog = useDialogStore((state) => state.setOpen);
  useEffect(() => {
    const gMaAction = gMaAnimated.actions.ldle;
    const gPaAction = gPaAnimated.actions.ldle;
    const momAction = momAnimated.actions.ldle;
    const uncleAction = uncleAnimated.actions.ldle;
    gMaAction.play();
    gPaAction.play();
    momAction.play();
    uncleAction.play();
  }, []);

  return (
    <>
      <primitive object={grandMa} scale={2} />
      <CheckbleItemWrapper
        setShowDialog={setShowDialog}
        dialogID={"grandmaMain"}
        isCheck={false}
        // 是否锁定视角
        // 需要给一个child的位置
        position={grandMa.children[0].position || new THREE.Vector3(0, 0, 0)}
        // 调整透明盒子位置
        offsetX={0}
        offsetY={0.5}
        offsetZ={0}
        // 调整透明盒子大小
        scaleX={1.5}
        scaleY={1.5}
        scaleZ={1.5}
      />
      <primitive object={grandPa} scale={2} />
      <CheckbleItemWrapper
        setShowDialog={setShowDialog}
        dialogID={"grandpaMain"}
        isCheck={false}
        // 是否锁定视角
        // 需要给一个child的位置
        position={grandPa.children[0].position || new THREE.Vector3(0, 0, 0)}
        // 调整透明盒子位置
        offsetX={0}
        offsetY={0.5}
        offsetZ={0}
        // 调整透明盒子大小
        scaleX={1.5}
        scaleY={1.5}
        scaleZ={1.5}
      />
      <primitive object={mom} scale={2} />
      <CheckbleItemWrapper
        setShowDialog={setShowDialog}
        dialogID={"momMain"}
        isCheck={false}
        // 是否锁定视角
        // 需要给一个child的位置
        position={mom.children[0].position || new THREE.Vector3(0, 0, 0)}
        // 调整透明盒子位置
        offsetX={0}
        offsetY={0.5}
        offsetZ={0}
        // 调整透明盒子大小
        scaleX={1.5}
        scaleY={1.5}
        scaleZ={1.5}
      />

      <primitive object={uncle} scale={2} />
      <CheckbleItemWrapper
        setShowDialog={setShowDialog}
        dialogID={"uncleMain"}
        isCheck={false}
        // 是否锁定视角
        // 需要给一个child的位置
        position={uncle.children[0].position || new THREE.Vector3(0, 0, 0)}
        // 调整透明盒子位置
        offsetX={0}
        offsetY={0.5}
        offsetZ={0}
        // 调整透明盒子大小
        scaleX={1.5}
        scaleY={1.5}
        scaleZ={1.5}
      />
    </>
  );
};

export default MainScenePeople;
