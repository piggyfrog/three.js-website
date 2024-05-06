import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import CheckbleItemWrapper from "../../components/CheckbleItemWrapper";
export default function FixedItems(props) {
  const { scene } = useGLTF("/main-scene-items.glb");
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
    </>
  );
}

useGLTF.preload("/main-scene-items.glb");
