import { Html, useProgress } from "@react-three/drei";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center className="loading">
      {progress} % loaded
    </Html>
  );
}

export default Loader;
