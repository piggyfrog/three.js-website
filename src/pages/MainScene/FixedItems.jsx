import React, { useRef,useEffect} from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import CheckbleItemWrapper from "../../components/CheckbleItemWrapper";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
export default function FixedItems(props) {
  const { scene } = useGLTF("/main-scene-items.glb");
  const { scene:color } = useGLTF("/main-scene-items-color.glb");
  
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        // 将所有网格的材料设置为透明，并且不渲染
        child.material.transparent = true;
        child.material.opacity = 0;
      }
    });
  }, [scene]);
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        // 为隐藏的对象设置一种不参与渲染的材料
        child.material = new THREE.MeshBasicMaterial({
          visible: false, // 完全不渲染这个材料
          side: THREE.DoubleSide // 确保所有面都不渲染
        });
      }
    });
  }, [scene]);
 

  const { scene: album } = useGLTF("/album2.glb");
  const { scene: chair } = useGLTF("/chair.glb");
  const { scene: glasscup } = useGLTF("/glasscup.glb");
  const { scene: teeth } = useGLTF("/teeth.glb");
  return (
    <>
      <RigidBody type="fixed" friction={0} restitution={0} scale={2}>
        <primitive object={scene} />
      </RigidBody>
      <primitive object={album} scale={2} />
      <CheckbleItemWrapper
        dialogID={"albumMain"}
        position={album.children[0].position}
        lockCamera={true}
        offsetX={0.1}
        offsetY={0}
        offsetZ={0.3}
        scaleX={0.6}
        scaleY={0.2}
        scaleZ={0.7}
      />
      <primitive object={chair} scale={2} />
      <CheckbleItemWrapper
        dialogID={"chairMain"}
        position={chair.children[0].position}
        offsetX={0}
        offsetY={0}
        offsetZ={0}
        scaleX={1}
        scaleY={1}
        scaleZ={1}
      />
      <primitive object={glasscup} scale={2} />
      <CheckbleItemWrapper
        dialogID={"glasscupMain"}
        position={glasscup.children[0].position}
        offsetX={0.1}
        offsetY={0}
        offsetZ={0}
        scaleX={0.6}
        scaleY={0.5}
        scaleZ={0.3}
      />
      <primitive object={teeth} scale={2} />
      <CheckbleItemWrapper
        dialogID={"teethMain"}
        position={teeth.children[0].position}
        offsetX={0}
        offsetY={0}
        offsetZ={0}
        scaleX={0.3}
        scaleY={0.3}
        scaleZ={0.3}
      />
      <primitive object={color} scale={2} />
    </>
  );
}

useGLTF.preload("/main-scene-items.glb");
