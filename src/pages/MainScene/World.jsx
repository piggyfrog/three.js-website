import Floor from "../../components/Floor";
import Wall from "../../components/Wall";
import FixedItems from "./FixedItems";
import MainScenePeople from "./People";
const World = () => {
  return (
    <>
      <Wall />
      <Floor />
      <FixedItems />
      <MainScenePeople />
    </>
  );
};

export default World;
