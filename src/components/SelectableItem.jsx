import React, { useRef } from 'react';
import { useThree } from '@react-three/fiber';

const SelectableItem = ({ model, onSelected }) => {
  const meshRef = useRef();
  const { scene } = useThree();

  const handleOnClick = () => {
    onSelected(meshRef.current);
  };

  return (
    <mesh ref={meshRef} onClick={handleOnClick} scale={[2, 2, 2]}>
      <primitive object={model.scene} />
    </mesh>
  );
};

export default SelectableItem;