import { useNavigate } from "react-router";
import { useGameStateStore } from "../../hooks/store";
const End = () => {
  const cleanGameState = useGameStateStore((state) => state.cleanGameState);
  const navigate = useNavigate();
  const restart = () => {
    cleanGameState();
    navigate("/");
  };
  return <img src="/images/restart.png" alt="restart" onClick={restart} />;
};

export default End;
