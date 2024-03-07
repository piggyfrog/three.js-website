import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect, useState } from "react";
import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
const Player = () => {
  const model = useGLTF("player.glb");
  const playerRef = useRef();
  const animations = useAnimations(model.animations, model.scene);
  const [currentAnimation, setCurrentAnimation] = useState(
    "CharacterArmature|Idle"
  );

  useEffect(() => {
    const actions = animations.actions;
    console.log(actions);
    console.log(playerRef.current);
  }, []);
  return (
    <primitive
      object={model.scene}
      position={[5, 0, -5]}
      scale={2.5}
      ref={playerRef}
    />
  );
};

export default Player;
