import * as THREE from "three";
import particlesVertexShader from "./shaders/particles/vertex.glsl";
import particlesFragmentShader from "./shaders/particles/fragment.glsl";
import { OrbitControls } from "@react-three/drei";
/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Loaders
const textureLoader = new THREE.TextureLoader();

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
  pixelRatio: Math.min(window.devicePixelRatio, 2),
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  sizes.pixelRatio = Math.min(window.devicePixelRatio, 2);

  // Materials
  particlesMaterial.uniforms.uResolution.value.set(
    sizes.width * sizes.pixelRatio,
    sizes.height * sizes.pixelRatio
  );

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(sizes.pixelRatio);
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  35,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(0, 0, 7.6);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enableZoom = false;
controls.enablePan = false;
controls.minPolarAngle = Math.PI * 0.45;
controls.maxPolarAngle = Math.PI * 0.55;
controls.dampingFactor = 0.1;
controls.minAzimuthAngle = Math.PI * -0.05;
controls.maxAzimuthAngle = Math.PI * 0.05;

window.addEventListener("mousemove", (event) => {
  const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  const mouseY = (event.clientY / window.innerHeight) * 2 - 1;

  // Calculate target offset based on mouse position
  controls.target.x = mouseX * 0.1; // Scale these values to adjust the effect intensity
  controls.target.y = -mouseY * 0.1;
  controls.update(); // Update the controls to apply the new target
});

const clock = new THREE.Clock(); // 创建一个新的 Clock 实例
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setClearColor("#181818");
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(sizes.pixelRatio);

/**
 * Displacement
 */
const displacement = {};

// 2D canvas
displacement.canvas = document.createElement("canvas");
displacement.canvas.width = 256;
displacement.canvas.height = 256;
displacement.canvas.style.position = "fixed";
displacement.canvas.style.width = "256px";
displacement.canvas.style.height = "256px";
displacement.canvas.style.top = 0;
displacement.canvas.style.left = 0;
displacement.canvas.style.zIndex = 10;
//document.body.append(displacement.canvas)

// Context
displacement.context = displacement.canvas.getContext("2d");
displacement.context.fillRect(
  0,
  0,
  displacement.canvas.width,
  displacement.canvas.height
);

// Glow image
displacement.glowImage = new Image();
displacement.glowImage.src = "./glow1.png";

// Interactive plane
displacement.interactivePlane = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshBasicMaterial({ color: "red", side: THREE.DoubleSide })
);
displacement.interactivePlane.visible = false;
scene.add(displacement.interactivePlane);

// Raycaster
displacement.raycaster = new THREE.Raycaster();

// Coordinates
displacement.screenCursor = new THREE.Vector2(9999, 9999);
displacement.canvasCursor = new THREE.Vector2(9999, 9999);
displacement.canvasCursorPrevious = new THREE.Vector2(9999, 9999);

window.addEventListener("pointermove", (event) => {
  displacement.screenCursor.x = (event.clientX / sizes.width) * 2 - 1;
  displacement.screenCursor.y = -(event.clientY / sizes.height) * 2 + 1;

  // Calculate target offset based on mouse position
  controls.target.x = mouseX * 0.5; // Scale these values to adjust the effect intensity
  controls.target.y = -mouseY * 0.5;
  controls.update(); // Update the controls to apply the new target
});

// Texture
displacement.texture = new THREE.CanvasTexture(displacement.canvas);

/**
 * Particles
 */
const particlesGeometry = new THREE.PlaneGeometry(10, 10, 300, 300);
particlesGeometry.setIndex(null);
particlesGeometry.deleteAttribute("normal");

const intensitiesArray = new Float32Array(
  particlesGeometry.attributes.position.count
);
const anglesArray = new Float32Array(
  particlesGeometry.attributes.position.count
);

for (let i = 0; i < particlesGeometry.attributes.position.count; i++) {
  intensitiesArray[i] = Math.random();
  anglesArray[i] = Math.random() * Math.PI * 2;
}

particlesGeometry.setAttribute(
  "aIntensity",
  new THREE.BufferAttribute(intensitiesArray, 1)
);
particlesGeometry.setAttribute(
  "aAngle",
  new THREE.BufferAttribute(anglesArray, 1)
);

const particlesMaterial = new THREE.ShaderMaterial({
  vertexShader: particlesVertexShader,
  fragmentShader: particlesFragmentShader,
  uniforms: {
    uResolution: new THREE.Uniform(
      new THREE.Vector2(
        sizes.width * sizes.pixelRatio,
        sizes.height * sizes.pixelRatio
      )
    ),
    uPictureTexture: new THREE.Uniform(textureLoader.load("./color.png")),
    uDisplacementTexture: new THREE.Uniform(displacement.texture),
    uTime: { value: 0 } // 添加时间控制变量
  },
  blending: THREE.AdditiveBlending,
});
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

/**
 * Animate
 */
const tick = () => {
  // Update controls
  controls.update();

  const elapsedTime = clock.getElapsedTime();
  particlesMaterial.uniforms.uTime.value = elapsedTime;
  /**
   * Raycaster
   */
  displacement.raycaster.setFromCamera(displacement.screenCursor, camera);
  const intersections = displacement.raycaster.intersectObject(
    displacement.interactivePlane
  );

  if (intersections.length) {
    const uv = intersections[0].uv;

    displacement.canvasCursor.x = uv.x * displacement.canvas.width;
    displacement.canvasCursor.y = (1 - uv.y) * displacement.canvas.height;
  }

  /**
   * Displacement
   */
  // Fade out
  displacement.context.globalCompositeOperation = "source-over";
  displacement.context.globalAlpha = 0.015;
  displacement.context.fillRect(
    0,
    0,
    displacement.canvas.width,
    displacement.canvas.height
  );

  // Speed alpha
  const cursorDistance = displacement.canvasCursorPrevious.distanceTo(
    displacement.canvasCursor
  );
  displacement.canvasCursorPrevious.copy(displacement.canvasCursor);
  const alpha = Math.min(cursorDistance * 0.05, 1);

  // Draw glow
  const glowSize = displacement.canvas.width * 0.5;
  displacement.context.globalCompositeOperation = "lighten";
  displacement.context.globalAlpha = alpha;
  displacement.context.drawImage(
    displacement.glowImage,
    displacement.canvasCursor.x - glowSize * 0.5,
    displacement.canvasCursor.y - glowSize * 0.5,
    glowSize,
    glowSize
  );

  // Texture
  displacement.texture.needsUpdate = true;

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();