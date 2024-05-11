import { useNavigate } from "react-router";
import { useGameStateStore } from "../../hooks/store";
import React from "react";
import { useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import { GPUComputationRenderer } from 'three/addons/misc/GPUComputationRenderer.js'
import GUI from 'lil-gui'
import particlesVertexShader from './shaders/particles/vertex.glsl'
import particlesFragmentShader from './shaders/particles/fragment.glsl'
import gpgpuParticlesShader from './shaders/gpgpu/particles.glsl'
import { mergeBufferGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import "./style.css";
import { useGLTF } from "@react-three/drei";

const End = () => {
  const gltf = useGLTF("/ending/ending.glb");
  const gltf2 = useGLTF("/ending/jiujiu.glb");
  const cleanGameState = useGameStateStore((state) => state.cleanGameState);
  const navigate = useNavigate();
  const restart = () => {
    cleanGameState();
    navigate("/");
  };
  
  useEffect(() => {
/**
 * Base
 */
// Debug
const gui = new GUI({ width: 340 })
const debugObject = {}

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Loaders
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/')

const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    pixelRatio: Math.min(window.devicePixelRatio, 2)
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    sizes.pixelRatio = Math.min(window.devicePixelRatio, 2)

    // Materials
    particles.material.uniforms.uResolution.value.set(sizes.width * sizes.pixelRatio, sizes.height * sizes.pixelRatio)

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(sizes.pixelRatio)
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(60, sizes.width / sizes.height, 0.1, 200)
camera.position.set(35, 2, -25)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.minAzimuthAngle = Math.PI * 0.65
controls.maxAzimuthAngle = Math.PI * 0.7
controls.minPolarAngle = Math.PI * 0.45
controls.maxPolarAngle = Math.PI * 0.51
controls.enableZoom = false
controls.dampingFactor = 1
controls.update()

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(sizes.pixelRatio)

debugObject.clearColor = '#ffffff'
renderer.setClearColor(debugObject.clearColor)

/**
 * Load model
 */
const model = gltf.scene;  // 获取加载的模型场景对象
model.scale.set(1, 1, 1);  // 将模型的缩放设置为0.5倍，可以根据需要调整这些值
const geometries = [];
gltf.scene.traverse(function (child) {
    if (child.isMesh) {
        geometries.push(child.geometry);
    }
});

const mergedGeometry = mergeBufferGeometries(geometries, false);

gltf2.scene.scale.set(3, 3, 3)
gltf2.scene.position.set(4, 3, -5)
scene.add(gltf2.scene)

/**
 * Base geometry
 */
const baseGeometry = {instance: mergedGeometry}
baseGeometry.count = baseGeometry.instance.attributes.position.count

/**
 * GPU Compute
 */
// Setup
const gpgpu = {}
gpgpu.size = Math.ceil(Math.sqrt(baseGeometry.count))
gpgpu.computation = new GPUComputationRenderer(gpgpu.size, gpgpu.size, renderer)

// Base particles
const baseParticlesTexture = gpgpu.computation.createTexture()
const scale = 3
const scale2 = 3

for(let i = 0; i < baseGeometry.count; i++)
{
    const i3 = i * 3
    const i4 = i * 4

    // Position based on geometry
    baseParticlesTexture.image.data[i4 + 0] = baseGeometry.instance.attributes.position.array[i3 + 0]*scale2
    baseParticlesTexture.image.data[i4 + 1] = baseGeometry.instance.attributes.position.array[i3 + 1]*scale
    baseParticlesTexture.image.data[i4 + 2] = baseGeometry.instance.attributes.position.array[i3 + 2]*scale
    baseParticlesTexture.image.data[i4 + 3] = Math.random()
}

// Particles variable
gpgpu.particlesVariable = gpgpu.computation.addVariable('uParticles', gpgpuParticlesShader, baseParticlesTexture)
gpgpu.computation.setVariableDependencies(gpgpu.particlesVariable, [ gpgpu.particlesVariable ])

// Uniforms
gpgpu.particlesVariable.material.uniforms.uTime = new THREE.Uniform(0)
gpgpu.particlesVariable.material.uniforms.uDeltaTime = new THREE.Uniform(0)
gpgpu.particlesVariable.material.uniforms.uBase = new THREE.Uniform(baseParticlesTexture)
gpgpu.particlesVariable.material.uniforms.uFlowFieldInfluence = new THREE.Uniform(0.5)
gpgpu.particlesVariable.material.uniforms.uFlowFieldStrength = new THREE.Uniform(2)
gpgpu.particlesVariable.material.uniforms.uFlowFieldFrequency = new THREE.Uniform(0.5)

// Init
gpgpu.computation.init()

// Debug
gpgpu.debug = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    new THREE.MeshBasicMaterial({ map: gpgpu.computation.getCurrentRenderTarget(gpgpu.particlesVariable).texture })
)
gpgpu.debug.position.x = 0
gpgpu.debug.visible = true 
scene.add(gpgpu.debug)

/**
 * Particles
 */
const particles = {}

// Geometry
const particlesUvArray = new Float32Array(baseGeometry.count * 2)
const sizesArray = new Float32Array(baseGeometry.count)

for(let y = 0; y < gpgpu.size; y++)
{
    for(let x = 0; x < gpgpu.size; x++)
    {
        const i = (y * gpgpu.size + x);
        const i2 = i * 2

        // UV
        const uvX = (x + 0.5) / gpgpu.size;
        const uvY = (y + 0.5) / gpgpu.size;

        particlesUvArray[i2 + 0] = uvX;
        particlesUvArray[i2 + 1] = uvY;

        // Size
        sizesArray[i] = Math.random()
    }
}

particles.geometry = new THREE.BufferGeometry()
particles.geometry.setDrawRange(0, baseGeometry.count)
particles.geometry.setAttribute('aParticlesUv', new THREE.BufferAttribute(particlesUvArray, 2))
particles.geometry.setAttribute('aColor', baseGeometry.instance.attributes.color)
particles.geometry.setAttribute('aSize', new THREE.BufferAttribute(sizesArray, 1))

// Material
particles.material = new THREE.ShaderMaterial({
    vertexShader: particlesVertexShader,
    fragmentShader: particlesFragmentShader,
    uniforms:
    {
        uSize: new THREE.Uniform(0.3),
        uResolution: new THREE.Uniform(new THREE.Vector2(sizes.width * sizes.pixelRatio, sizes.height * sizes.pixelRatio)),
        uParticlesTexture: new THREE.Uniform()
    }
})

// Points
particles.points = new THREE.Points(particles.geometry, particles.material)
scene.add(particles.points)

/**
 * Tweaks
 */
gui.addColor(debugObject, 'clearColor').onChange(() => { renderer.setClearColor(debugObject.clearColor) })
gui.add(particles.material.uniforms.uSize, 'value').min(0).max(1).step(0.001).name('uSize')
gui.add(gpgpu.particlesVariable.material.uniforms.uFlowFieldInfluence, 'value').min(0).max(1).step(0.001).name('uFlowfieldInfluence')
gui.add(gpgpu.particlesVariable.material.uniforms.uFlowFieldStrength, 'value').min(0).max(10).step(0.001).name('uFlowfieldStrength')
gui.add(gpgpu.particlesVariable.material.uniforms.uFlowFieldFrequency, 'value').min(0).max(1).step(0.001).name('uFlowfieldFrequency')

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime
    
    // Update controls
    controls.update()

    // GPGPU Update
    gpgpu.particlesVariable.material.uniforms.uTime.value = elapsedTime
    gpgpu.particlesVariable.material.uniforms.uDeltaTime.value = deltaTime
    gpgpu.computation.compute()
    particles.material.uniforms.uParticlesTexture.value = gpgpu.computation.getCurrentRenderTarget(gpgpu.particlesVariable).texture

    // Render normal scene
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
  }, []);

  return  (
  <div className="Body">
      <img src="/images/restart.png" alt="restart" onClick={restart} />;
      <div className="scrollable-content">
        <h1>占位</h1>
      </div>
      <canvas className="webgl"></canvas>
    </div>
    );
};

export default End;
