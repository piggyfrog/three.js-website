import { PointerLockControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useLockCameraStore, useActionStore } from "../hooks/store";
import { useEffect, useRef, useState } from "react";
const FPV = () => {
  const { camera, gl } = useThree();
  const lockCamera = useLockCameraStore((state) => state.lockCamera);
  const action = useActionStore((state) => state.action);
  const setAction = useActionStore((state) => state.setAction);
  const [locked, setLocked] = useState(false);
  const setLockCamera = useLockCameraStore((state) => state.setLockCamera);
  const ref = useRef();
  useEffect(() => {
    if (lockCamera) {
      ref.current.unlock();
      setLocked(true);
    }
    if (!lockCamera && locked) {
      setLocked(false);
      if (ref.current) {
        ref.current.lock();
      }
    }
  }, [lockCamera]);

  useEffect(() => {
    if (!locked) {
      if (ref.current) {
        ref.current.lock();
      }
    }
  }, [locked]);

  useEffect(() => {
    if (action === "closeAlbum") {
      setAction("");
      setLockCamera(false);
    }
  }, [action]);

  return locked ? null : (
    <PointerLockControls args={[camera, gl.domElement]} ref={ref} />
  );
};

export default FPV;
