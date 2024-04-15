import { RigidBody } from "@react-three/rapier";
import Floor from "../../components/Floor";
import Wall from "../../components/Wall";
import FixedItems from "./FixedItems";
import Items from "../../components/Item";
import { Suspense } from "react";
import Loader from "../../components/Loader";
const World = ({ setShowDialog }) => {
  return (
    <Suspense fallback={<Loader />}>
      <Wall />
      <Floor />
      <Items setShowDialog={setShowDialog} />
      <FixedItems />
    </Suspense>
  );
};

export default World;
