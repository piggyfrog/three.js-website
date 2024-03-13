import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export default function Floor(props) {
  const { scene } = useGLTF("/floor.glb");
  return (
    <RigidBody type="fixed" friction={0} restitution={0} scale={2}>
      <primitive object={scene} />
    </RigidBody>
  );
  // return (
  //   <group {...props} dispose={null}>
  //     <RigidBody
  //       type="fixed"
  //       friction={0}
  //       restitution={0}
  //       position={[0, 1.5, 3]}
  //     >
  //       <mesh
  //         castShadow
  //         receiveShadow
  //         geometry={nodes.living_room.geometry}
  //         material={materials.floor_001}
  //         rotation={[Math.PI / 2, 0, 0]}
  //         scale={0.01}
  //         position={[0, -1.5, -3]}
  //       />
  //     </RigidBody>
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.terrace.geometry}
  //       material={materials.floor_002}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.kitchen.geometry}
  //       material={materials.floor_002}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.stair2.geometry}
  //       material={materials.floor_002}
  //       position={[0, -1.4, 0]}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.stair1.geometry}
  //       material={materials.floor_002}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.corridor2.geometry}
  //       material={materials.floor_002}
  //       position={[0, -1.4, 0]}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.corridor1.geometry}
  //       material={materials.floor_002}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.bedroom.geometry}
  //       material={materials.floor_002}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //   </group>
  // );
}

useGLTF.preload("/floor.glb");
