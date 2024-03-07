import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
export default function Wall(props) {
  const { nodes, materials, scene } = useGLTF("/wall.glb");
  const { scene: roofScene } = useGLTF("/roof.glb");
  const { scene: itemScene1 } = useGLTF("/items1.glb");
  const { scene: itemScene2 } = useGLTF("/items2.glb");
  return (
    <RigidBody type="fixed" friction={0} restitution={0} scale={2}>
      <primitive object={scene} />
      <primitive object={roofScene} />
      {/* <primitive object={itemScene1} />
      <primitive object={itemScene2} /> */}
    </RigidBody>
  );
  // return (
  //   <group {...props} dispose={null}>
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.挤压_69.geometry}
  //       material={materials.wall_015}
  //       position={[0, -1.8, 0]}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.挤压_68.geometry}
  //       material={materials.wall_015}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.挤压_67.geometry}
  //       material={materials.wall_015}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.挤压_66.geometry}
  //       material={materials.wall_022}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.挤压_65.geometry}
  //       material={materials.wall_022}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.挤压_10.geometry}
  //       material={materials.wall_015}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.挤压_63.geometry}
  //       material={materials.wall_012}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.挤压_61.geometry}
  //       material={materials.wall_012}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.挤压_46.geometry}
  //       material={materials.wall_022}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.挤压_45.geometry}
  //       material={materials.wall_022}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.挤压_44.geometry}
  //       material={materials.wall_011}
  //       position={[0, -1.8, 0]}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.挤压_40.geometry}
  //       material={materials.wall_012}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.挤压_39.geometry}
  //       material={materials.wall_012}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.挤压_38.geometry}
  //       material={materials.wall_012}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.挤压_37.geometry}
  //       material={materials.wall_012}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.挤压_36.geometry}
  //       material={materials.wall_012}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.挤压_32.geometry}
  //       material={materials.wall_003}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.挤压_12.geometry}
  //       material={materials.wall_015}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.挤压_3.geometry}
  //       material={materials.wall_012}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.挤压_2.geometry}
  //       material={materials.wall_012}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.挤压_59.geometry}
  //       material={materials.wall_016}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.挤压_11.geometry}
  //       material={materials.wall_021}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.挤压_64.geometry}
  //       material={materials.wall_003}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.挤压_62.geometry}
  //       material={materials.wall_008}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.挤压_60.geometry}
  //       material={materials.wall_014}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.挤压_58.geometry}
  //       material={materials.wall_003}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.挤压_57.geometry}
  //       material={materials.wall_004_2}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.挤压_56.geometry}
  //       material={materials.wall_004}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.挤压_55.geometry}
  //       material={materials.wall_013}
  //       position={[0, -1.8, 0]}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.挤压_54.geometry}
  //       material={materials.wall_013}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.挤压_53.geometry}
  //       material={materials.wall_013}
  //       position={[0, -1.8, 0]}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.挤压_52.geometry}
  //       material={materials.wall_004}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.挤压_51.geometry}
  //       material={materials.wall_004}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.挤压_50.geometry}
  //       material={materials.wall_001}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.挤压_49.geometry}
  //       material={materials.wall_003}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.挤压_48.geometry}
  //       material={materials.wall_001}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.挤压_47.geometry}
  //       material={materials.wall_002}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.挤压_43.geometry}
  //       material={materials.wall_003}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.挤压_42.geometry}
  //       material={materials.wall_008}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.挤压_41.geometry}
  //       material={materials.wall_004}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.挤压_35.geometry}
  //       material={materials.wall_005}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.挤压_34.geometry}
  //       material={materials.wall_005}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.挤压_33.geometry}
  //       material={materials.wall_003}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.挤压_31.geometry}
  //       material={materials.wall_002}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.挤压_29.geometry}
  //       material={materials.wall_011}
  //       position={[0, -1.8, 0]}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.挤压_28.geometry}
  //       material={materials.wall_004}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.挤压_27.geometry}
  //       material={materials.wall_011}
  //       position={[0, -2.8, 0]}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.挤压_26.geometry}
  //       material={materials.wall_011}
  //       position={[0, -2.8, 0]}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.挤压_25.geometry}
  //       material={materials.wall_011}
  //       position={[0, -1.8, 0]}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.挤压_24.geometry}
  //       material={materials.wall_004}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.挤压_23.geometry}
  //       material={materials.wall_011}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.挤压_22.geometry}
  //       material={materials.wall_004}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.挤压_21.geometry}
  //       material={materials.wall_004_2}
  //       position={[0, -1.8, 0]}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.挤压_19.geometry}
  //       material={materials.wall_002}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.挤压_18.geometry}
  //       material={materials.wall_015}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.挤压_17.geometry}
  //       material={materials.wall_013}
  //       position={[0, -1.8, 0]}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.挤压_16.geometry}
  //       material={materials.wall_011}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.挤压_15.geometry}
  //       material={materials.wall_001}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.挤压_14.geometry}
  //       material={materials.wall_001}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.挤压_13.geometry}
  //       material={materials.wall_003}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.挤压_9.geometry}
  //       material={materials.wall_007}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.挤压_8.geometry}
  //       material={materials.wall_008}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.挤压_7.geometry}
  //       material={materials.wall_008}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.挤压_6.geometry}
  //       material={materials.wall_002}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.挤压_5.geometry}
  //       material={materials.wall_008}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.挤压_4.geometry}
  //       material={materials.wall_003}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.挤压_1.geometry}
  //       material={materials.wall_004}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.挤压.geometry}
  //       material={materials.wall_002}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={nodes.挤压_30.geometry}
  //       material={materials.wall_003}
  //       rotation={[Math.PI / 2, 0, 0]}
  //       scale={0.01}
  //     />
  //   </group>
  // );
}

useGLTF.preload("/wall.glb");
useGLTF.preload("/roof.glb");
