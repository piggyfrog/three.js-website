import { RigidBody } from "@react-three/rapier";
import Floor from "./components/Floor";
import Wall from "./components/Wall";
import { useGLTF, useAnimations } from "@react-three/drei";
import Items from "./components/Item";
const World = () => {
  return (
    <>
      <Wall />
      <Floor />
      {/* <Items /> */}
    </>
  );
};

export default World;
