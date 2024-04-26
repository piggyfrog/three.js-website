import CheckbleItemWrapper from "../../components/CheckbleItemWrapper";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
const Items = ({ setShowDialog }) => {
  const { scene: Album } = useGLTF("secondScene/no-collider/album.glb");
  const { scene: Camera } = useGLTF("secondScene/no-collider/camera.glb");
  const { scene: Diary } = useGLTF("secondScene/no-collider/diary.glb");
  const { scene: Fruit } = useGLTF("secondScene/no-collider/fruit.glb");
  return (
    <>
      <primitive object={Fruit} scale={2} />
      <CheckbleItemWrapper
        setShowDialog={setShowDialog}
        // 需要给一个child的位置
        position={Fruit.children[6].position || new THREE.Vector3(0, 0, 0)}
        // 调整透明盒子位置
        offsetX={0.7}
        offsetY={0.2}
        offsetZ={0.3}
        // 调整透明盒子大小
        scaleX={2.5}
        scaleY={0.5}
        scaleZ={1.4}
      />
      <primitive object={Camera} scale={2} />
      <CheckbleItemWrapper
        setShowDialog={setShowDialog}
        // 需要给一个child的位置
        position={Camera.children[0].position || new THREE.Vector3(0, 0, 0)}
        // 调整透明盒子位置
        offsetX={-0.2}
        offsetY={-0.2}
        offsetZ={0}
        // 调整透明盒子大小
        scaleX={0.5}
        scaleY={0.3}
        scaleZ={0.4}
      />
      <primitive object={Album} scale={2} />
      <CheckbleItemWrapper
        setShowDialog={setShowDialog}
        // 需要给一个child的位置
        position={Album.children[0].position || new THREE.Vector3(0, 0, 0)}
        // 调整透明盒子位置
        offsetX={0}
        offsetY={0}
        offsetZ={0}
        // 调整透明盒子大小
        scaleX={0.4}
        scaleY={0.2}
        scaleZ={0.7}
      />
      <primitive object={Diary} scale={2} />
      <CheckbleItemWrapper
        setShowDialog={setShowDialog}
        // 需要给一个child的位置
        position={Diary.children[0].position || new THREE.Vector3(0, 0, 0)}
        // 调整透明盒子位置
        offsetX={-0.1}
        offsetY={0}
        offsetZ={0}
        // 调整透明盒子大小
        scaleX={0.4}
        scaleY={0.2}
        scaleZ={0.6}
      />
    </>
  );
};

export default Items;
