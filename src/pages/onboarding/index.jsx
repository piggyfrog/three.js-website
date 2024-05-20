import React from "react";
import { useEffect, useState } from "react";
import particlesVertexShader from "./shaders/particles/vertex.glsl";
import particlesFragmentShader from "./shaders/particles/fragment.glsl";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { useNavigate } from "react-router";
import * as THREE from "three";
import "./style.css";
const Onboarding = () => {
  const photoArray = ["./images/color5.png", "./images/color3.png", "./images/color.png", "./images/color2.png", "./images/color4.png","./images/color1.png"];
  const [photoIndex, setPhotoIndex] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const tick = () => {
      setPhotoIndex((index) => (index + 1) % photoArray.length); // 更新照片索引
      setTimeout(tick, 15000); // 设置下一次更新
    };

    const timeoutId = setTimeout(tick, 15000);
    return () => clearTimeout(timeoutId); // 清理函数
  }, []);

  const photo = photoArray[photoIndex];

  useEffect(() => {
    // 添加 Intersection Observer API 逻辑
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible");
          }
        });
      },
      {
        rootMargin: "0px 0px -300px 0px", // 延迟 200px 出现
        threshold: 1 // 设置为 0 当元素刚刚进入视窗时触发
      }
    );

    const scrollElements = document.querySelectorAll(".scroll-png");
    scrollElements.forEach((element) => observer.observe(element));

    return () => {
      scrollElements.forEach((element) => observer.unobserve(element));
    };
  }, []);

  useEffect(() => {
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
    controls.enableDamping = false;
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

    window.addEventListener("pointermove", (event) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1; // Redefine mouseX for this scope
      const mouseY = (event.clientY / window.innerHeight) * 2 - 1; // Redefine mouseY for this scope

      displacement.screenCursor.x = mouseX;
      displacement.screenCursor.y = -mouseY;

      // Calculate target offset based on mouse position
      controls.target.x = mouseX * 0.5; // Adjust these values if needed
      controls.target.y = -mouseY * 0.5;
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
    displacement.glowImage.src = "./images/glow1.png";

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
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = (event.clientY / window.innerHeight) * 2 - 1;
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
        uPictureTexture: new THREE.Uniform(textureLoader.load(photo)),
        uDisplacementTexture: new THREE.Uniform(displacement.texture),
        uTime: { value: 0 }, // 添加时间控制变量
        uRandomSeed: {
          value: new THREE.Vector3(Math.random(), Math.random(), Math.random()),
        },
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
      displacement.context.globalAlpha = 0.02;
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
      const glowSize = displacement.canvas.width * 0.25;
      displacement.context.globalCompositeOperation = "lighter";
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
  }, [photo]);

  //scroll speed
  useEffect(() => {
    let scrollTimeout;
    let isScrolling = false;
  
    const smoothScroll = (event) => {
      if (isScrolling) return; // 如果正在滚动，则不处理新的滚动事件
  
      isScrolling = true; // 标记为正在滚动
      const deltaY = event.deltaY * 0.5; // 调整此值来控制滚动速度
      const targetScroll = window.scrollY + deltaY;
      const startScroll = window.scrollY;
      const startTime = performance.now();
  
      const animateScroll = (currentTime) => {
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / 500, 1); // 调整500以改变滚动持续时间
        window.scrollTo(0, startScroll + (targetScroll - startScroll) * progress);
  
        if (progress < 1) {
          scrollTimeout = window.requestAnimationFrame(animateScroll);
        } else {
          isScrolling = false; // 滚动完成后标记为未滚动
        }
      };
  
      scrollTimeout = window.requestAnimationFrame(animateScroll);
    };
  
    window.addEventListener("wheel", smoothScroll, { passive: false });
  
    return () => {
      window.removeEventListener("wheel", smoothScroll);
      if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
      }
    };
  }, []);

  return (
    <>
      <div className="scroll-content">
        <img
          src="/images/onboarding-title.png"
          alt="Title"
          className="onboarding-title-png"
        />
        <img src="/images/onboarding/0.png" alt="Onboarding" className="scroll-png-0" />
        <img src="/images/onboarding/1.png" alt="Onboarding1" className="scroll-png scroll-png-1" />
        <img src="/images/onboarding/2.png" alt="Onboarding2" className="scroll-png scroll-png-2" />
        <img src="/images/onboarding/3.png" alt="Onboarding3" className="scroll-png scroll-png-3" />
        <img src="/images/onboarding/23.png" alt="Onboarding4" className="scroll-png scroll-png-23" />
        <img src="/images/onboarding/4.png" alt="Onboarding4" className="scroll-png scroll-png-4" />
        <img src="/images/onboarding/5.png" alt="Onboarding5" className="scroll-png scroll-png-5" />
        <img src="/images/onboarding/6.png" alt="Onboarding6" className="scroll-png scroll-png-6" />
        <img src="/images/onboarding/7.png" alt="Onboarding7" className="scroll-png scroll-png-7" />
        <img src="/images/onboarding/24.png" alt="Onboarding24" className="scroll-png scroll-png-24" />
        <img src="/images/onboarding/8.png" alt="Onboarding8" className="scroll-png scroll-png-8" />
        <img src="/images/onboarding/9.png" alt="Onboarding9" className="scroll-png scroll-png-9" />
        <img src="/images/onboarding/25.png" alt="Onboarding25" className="scroll-png scroll-png-25" />
        <img src="/images/onboarding/10.png" alt="Onboarding10" className="scroll-png scroll-png-10" />
        <img src="/images/onboarding/11.png" alt="Onboarding11" className="scroll-png scroll-png-11" />
        <img src="/images/onboarding/26.png" alt="Onboarding26" className="scroll-png scroll-png-26" />
        <img src="/images/onboarding/12.png" alt="Onboarding12" className="scroll-png scroll-png-12" />
        <img src="/images/onboarding/13.png" alt="Onboarding13" className="scroll-png scroll-png-13" />
        <img src="/images/onboarding/14.png" alt="Onboarding14" className="scroll-png scroll-png-14" />
        <img src="/images/onboarding/15.png" alt="Onboarding15" className="scroll-png scroll-png-15" />
        <img src="/images/onboarding/16.png" alt="Onboarding16" className="scroll-png scroll-png-16" />
        <img src="/images/onboarding/27.png" alt="Onboarding27" className="scroll-png scroll-png-27" />
        <img src="/images/onboarding/17.png" alt="Onboarding17" className="scroll-png scroll-png-17" />
        <img src="/images/onboarding/18.png" alt="Onboarding18" className="scroll-png scroll-png-18" />
        <img src="/images/onboarding/19.png" alt="Onboarding19" className="scroll-png scroll-png-19" />
        <img src="/images/onboarding/20.png" alt="Onboarding20" className="scroll-png scroll-png-20" onClick={() => navigate("/main")}/>
        <img src="/images/onboarding/21.png" alt="Onboarding21" className=" scroll-png-21" />
        <img src="/images/onboarding/22.png" alt="Onboarding22" className=" scroll-png-22" />
        
      </div>
      <canvas className="webgl"></canvas>
    </>
  );
};

export default Onboarding;
