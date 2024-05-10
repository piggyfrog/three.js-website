import { BallCollider, RigidBody, CapsuleCollider } from "@react-three/rapier";
import { useRef, useEffect, useState } from "react";
import { useKeyboardControls } from "@react-three/drei";
import * as THREE from "three";
import { useThree, useFrame } from "@react-three/fiber";
import { usePlayerLocationStore } from "../hooks/store";

const SPEED = 5;
const velocity = new THREE.Vector3();
const forwardDirectionVector = new THREE.Vector3();
const sidewaysDirectionVector = new THREE.Vector3();

const FPScontrols = () => {
  const [subscribeToKeys, getKeys] = useKeyboardControls();
  const rigidBodyRef = useRef();
  const { camera } = useThree();

  const shouldSave = usePlayerLocationStore((state) => state.shouldSave);
  const setShouldSave = usePlayerLocationStore((state) => state.setShouldSave);
  const setShouldLoad = usePlayerLocationStore((state) => state.setShouldLoad);
  const shouldLoad = usePlayerLocationStore((state) => state.shouldLoad);
  const playerLocation = usePlayerLocationStore(
    (state) => state.playerLocation
  );
  const setPlayerLocation = usePlayerLocationStore(
    (state) => state.setPlayerLocation
  );

  useEffect(() => {
    if (shouldLoad) {
      rigidBodyRef.current.setTranslation({
        x: playerLocation.x,
        y: playerLocation.y,
        z: playerLocation.z,
      });
      setShouldLoad(false);
    }
    if (shouldSave) {
      const pos = rigidBodyRef.current.translation();
      setPlayerLocation(new THREE.Vector3(pos.x, pos.y, pos.z));
      console.log("saving location", pos);
      setShouldSave(false);
    }
  }, [shouldSave, setShouldLoad]);

  useFrame((state, delta) => {
    //get input key values on every frame
    const {
      forwardKeyPressed,
      rightKeyPressed,
      backwardKeyPressed,
      leftKeyPressed,
    } = getKeys();

    //check if ref has been linked to rigid body
    if (rigidBodyRef.current) {
      //get current position of rigid body (on every frame)
      const pos = rigidBodyRef.current.translation();

      //copy rigid body position to camera (on every frame)
      camera.position.copy(new THREE.Vector3(pos.x, pos.y + 2, pos.z));

      //'front direction' takes true/false values from keyboard input
      //  and treats them as 1/0. When summed together you get a number
      //  on the z-axis telling you if you're going forward or backward.
      //Forward is in the -z direction
      forwardDirectionVector.set(0, 0, -forwardKeyPressed + backwardKeyPressed);

      //same for x, left is in the -x direction
      sidewaysDirectionVector.set(rightKeyPressed - leftKeyPressed, 0, 0);

      /**
       * VELOCITY SETUP
       */

      //combine forward & side directions into one vector
      //  (just for concise writing).Its the same same as
      //  doing { x: sideDir.x, y:0, z: forwardDir.z}
      velocity.addVectors(forwardDirectionVector, sidewaysDirectionVector);

      //force the combined vector to a magnitude of 1
      velocity.normalize();

      //give the combined vector a desired magnitude
      //i.e multiply direction by speed to get velocity
      velocity.multiplyScalar(SPEED);

      //account for different frame rates per user
      //'20' here is an arbitrary tuning value though
      velocity.multiplyScalar(delta * 20);

      //account for the pointerLock direction with some 'math'
      //  so that left,right etc are all relative to camera direction
      velocity.applyEuler(camera.rotation);
      //applying camera rotation to velocity can also be done with
      // velocity.applyQuaternion(camera.quaternion);

      //set the velicity of your capsule collider to the result velocity above
      rigidBodyRef.current.setLinvel({
        x: velocity.x,
        y: 0, //zero this if you don't have 'jump' functionality
        z: velocity.z,
      });
    }
  });
  return (
    <RigidBody
      ref={rigidBodyRef}
      colliders={false}
      canSleep={false}
      mass={5}
      friction={0}
      restitution={0}
      enabledRotations={[false, false, false]} //prevent from falling sideways
    >
      {/**for the capsule, args={[halfCapsuleHeight-radius, radius]} 
      think of (halfCapsuleHeight-radius) as the height of the straight vertical section only (cut in half)
      */}
      <BallCollider args={[0.5]} />
    </RigidBody>
  );
};

export default FPScontrols;
