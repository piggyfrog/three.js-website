// OutlineEffect.jsx
import React, { useRef, useEffect } from 'react';
import { extend, useThree, useFrame } from '@react-three/fiber';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import * as THREE from 'three';

extend({ OutlinePass, RenderPass, EffectComposer });

const OutlineEffect = ({ selectedObjects }) => {
  const { scene, gl, camera, size } = useThree();
  const composer = useRef();

  useEffect(() => {
    const effectComposer = new EffectComposer(gl);
    effectComposer.setSize(size.width, size.height);
    const renderPass = new RenderPass(scene, camera);
    effectComposer.addPass(renderPass);

    const outlinePass = new OutlinePass(new THREE.Vector2(size.width, size.height), scene, camera);
    outlinePass.edgeStrength = 10;
    outlinePass.edgeGlow = 1;
    outlinePass.edgeThickness = 1;
    outlinePass.visibleEdgeColor.set('#ffffff');
    outlinePass.hiddenEdgeColor.set('#190a05');
    effectComposer.addPass(outlinePass);

    composer.current = effectComposer;

    return () => {
      composer.current.dispose();
    };
  }, [scene, gl, camera, size.width, size.height]);

  useFrame(() => {
    composer.current.render();
  }, 1);

  useEffect(() => {
    const outlinePass = composer.current.passes.find(pass => pass instanceof OutlinePass);
    if (outlinePass) {
      outlinePass.selectedObjects = selectedObjects;
    }
  }, [selectedObjects]);

  return null;
};

export default OutlineEffect;