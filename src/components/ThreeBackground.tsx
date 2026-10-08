import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function ThreeBackground({ isDark }: { isDark: boolean }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Detect if device is Desktop/PC or Mobile
    const checkIsDesktop = () => {
      const isLargeScreen = window.innerWidth >= 768;
      const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      return isLargeScreen && !isMobileUA;
    };

    let isDesktopMode = checkIsDesktop();

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: isDesktopMode, // Antialiasing only on desktop
      powerPreference: isDesktopMode ? 'high-performance' : 'low-power' 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isDesktopMode ? 1.75 : 1.0));
    mountRef.current.appendChild(renderer.domElement);

    // 2. Procedural Soft Glow Radial Texture for Live Dots
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.25, 'rgba(52, 211, 153, 0.9)'); // Bright Emerald
      gradient.addColorStop(0.55, 'rgba(16, 185, 129, 0.4)');
      gradient.addColorStop(1, 'rgba(5, 150, 105, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
    }
    const dotTexture = new THREE.CanvasTexture(canvas);

    // 3. Live Moving Dots (Particles)
    // Desktop gets full density, mobile gets smooth lightweight count
    const particleCount = isDesktopMode ? 280 : 120;
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      // Natural drifting velocity
      velocities[i * 3] = (Math.random() - 0.5) * 0.006;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.006;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.004;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: isDesktopMode ? 0.22 : 0.26,
      color: 0x34d399, // Emerald highlight
      map: dotTexture,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // 4. Subtle Interconnecting Network Lines between Nearby Dots (Active on PC)
    const maxLines = isDesktopMode ? 320 : 0;
    let linesGeometry: THREE.BufferGeometry | null = null;
    let linesMaterial: THREE.LineBasicMaterial | null = null;
    let linesMesh: THREE.LineSegments | null = null;

    if (isDesktopMode) {
      const linePositions = new Float32Array(maxLines * 6);
      linesGeometry = new THREE.BufferGeometry();
      linesGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

      linesMaterial = new THREE.LineBasicMaterial({
        color: 0x10b981,
        transparent: true,
        opacity: 0.22,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
      scene.add(linesMesh);
    }

    // 5. Original 15 Glass Transmission Cubes (Restored Exclusively for Desktop / PC)
    // Mobile is protected to prevent GPU freezes
    const glassCubes: THREE.Mesh[] = [];
    let cubeGeometry: THREE.BoxGeometry | null = null;
    let glassCubeMaterial: THREE.MeshPhysicalMaterial | null = null;

    if (isDesktopMode) {
      cubeGeometry = new THREE.BoxGeometry(0.85, 0.85, 0.85);

      // Heavy realistic glass transmission and refraction material
      glassCubeMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x10b981,
        transmission: 0.88,       // Real glass transmission
        opacity: 1,
        transparent: true,
        roughness: 0.12,
        ior: 1.5,                 // Realistic glass refraction index
        thickness: 1.25,          // Glass volume depth
        reflectivity: 0.55,
        clearcoat: 0.35,
        clearcoatRoughness: 0.1,
        specularIntensity: 1.0,
        specularColor: new THREE.Color(0x6ee7b7),
        emissive: 0x064e3b,
        emissiveIntensity: 0.22,
      });

      // Exactly 15 floating glass cubes across 3D space
      const cubeCount = 15;
      for (let i = 0; i < cubeCount; i++) {
        const cube = new THREE.Mesh(cubeGeometry, glassCubeMaterial);
        
        // Random scale variation for natural depth
        const scale = 0.55 + Math.random() * 0.75;
        cube.scale.set(scale, scale, scale);

        // Position across wide field
        cube.position.set(
          (Math.random() - 0.5) * 14,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 7 - 1
        );

        cube.rotation.set(
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2
        );

        cube.userData = {
          rx: (Math.random() - 0.5) * 0.007,
          ry: (Math.random() - 0.5) * 0.007,
          rz: (Math.random() - 0.5) * 0.005,
          baseY: cube.position.y,
          baseX: cube.position.x,
          floatSpeed: 0.6 + Math.random() * 0.8,
          floatOffset: Math.random() * Math.PI * 2,
        };

        scene.add(cube);
        glassCubes.push(cube);
      }
    }

    // 6. Lights Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, isDesktopMode ? 0.8 : 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x34d399, isDesktopMode ? 2.2 : 1.4, 18);
    pointLight.position.set(0, 0, 4);
    scene.add(pointLight);

    let rimLight: THREE.PointLight | null = null;
    if (isDesktopMode) {
      // Secondary cyan rim light on PC to highlight glass cube edges
      rimLight = new THREE.PointLight(0x06b6d4, 1.6, 20);
      rimLight.position.set(-6, 5, -2);
      scene.add(rimLight);
    }

    // 7. Live Mouse / Touch Interaction Tracking
    let normMouseX = 0;
    let normMouseY = 0;
    let targetCameraX = 0;
    let targetCameraY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      normMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      normMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        normMouseX = (e.touches[0].clientX / window.innerWidth - 0.5) * 2;
        normMouseY = (e.touches[0].clientY / window.innerHeight - 0.5) * 2;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // 8. High-Performance Animation Loop with Tab Inactivity Pause
    let animId: number;
    let isRunning = true;
    const clock = new THREE.Clock();

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isRunning = false;
      } else {
        isRunning = true;
        clock.getDelta(); // reset delta
        animate();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const animate = () => {
      if (!isRunning) return;
      animId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth camera parallax following mouse
      targetCameraX = normMouseX * (isDesktopMode ? 2.0 : 1.2);
      targetCameraY = -normMouseY * (isDesktopMode ? 1.5 : 0.9);
      camera.position.x += (targetCameraX - camera.position.x) * 0.045;
      camera.position.y += (targetCameraY - camera.position.y) * 0.045;
      camera.lookAt(0, 0, 0);

      // Light dynamically follows mouse
      pointLight.position.x = targetCameraX * 1.3;
      pointLight.position.y = targetCameraY * 1.3;

      // Update Live Dots (drift + bounds bounce)
      const posAttr = particlesGeometry.attributes.position;
      const posArr = posAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        posArr[i3] += velocities[i3];
        posArr[i3 + 1] += velocities[i3 + 1];
        posArr[i3 + 2] += velocities[i3 + 2];

        // Bounds bounce/wrap smoothly
        if (Math.abs(posArr[i3]) > 9) velocities[i3] *= -1;
        if (Math.abs(posArr[i3 + 1]) > 7) velocities[i3 + 1] *= -1;
        if (Math.abs(posArr[i3 + 2]) > 6) velocities[i3 + 2] *= -1;
      }
      posAttr.needsUpdate = true;

      // Update Connecting Lines on PC (Desktop Only)
      if (isDesktopMode && linesGeometry && linesMesh) {
        let lineIndex = 0;
        const connectionDist = 1.7;
        const linePosAttr = linesGeometry.attributes.position;
        const linePosArr = linePosAttr.array as Float32Array;

        const checkLimit = Math.min(particleCount, 95);
        for (let i = 0; i < checkLimit && lineIndex < maxLines; i++) {
          const i3 = i * 3;
          const x1 = posArr[i3];
          const y1 = posArr[i3 + 1];
          const z1 = posArr[i3 + 2];

          for (let j = i + 1; j < checkLimit && lineIndex < maxLines; j++) {
            const j3 = j * 3;
            const dx = x1 - posArr[j3];
            const dy = y1 - posArr[j3 + 1];
            const dz = z1 - posArr[j3 + 2];
            const distSq = dx * dx + dy * dy + dz * dz;

            if (distSq < connectionDist * connectionDist) {
              const ptr = lineIndex * 6;
              linePosArr[ptr] = x1;
              linePosArr[ptr + 1] = y1;
              linePosArr[ptr + 2] = z1;
              linePosArr[ptr + 3] = posArr[j3];
              linePosArr[ptr + 4] = posArr[j3 + 1];
              linePosArr[ptr + 5] = posArr[j3 + 2];
              lineIndex++;
            }
          }
        }

        // Clear remaining line coordinates
        for (let i = lineIndex * 6; i < maxLines * 6; i++) {
          linePosArr[i] = 0;
        }
        linePosAttr.needsUpdate = true;

        linesMesh.rotation.y = particlesMesh.rotation.y;
        linesMesh.rotation.x = particlesMesh.rotation.x;
      }

      // Rotate particles slightly with mouse influence
      particlesMesh.rotation.y = normMouseX * 0.15;
      particlesMesh.rotation.x = -normMouseY * 0.15;

      // Animate 15 Glass Cubes on Desktop
      if (isDesktopMode && glassCubes.length > 0) {
        glassCubes.forEach((cube) => {
          cube.rotation.x += cube.userData.rx;
          cube.rotation.y += cube.userData.ry;
          cube.rotation.z += cube.userData.rz;

          // Organic floating wave motion
          cube.position.y = cube.userData.baseY + Math.sin(elapsedTime * cube.userData.floatSpeed + cube.userData.floatOffset) * 0.45;
          cube.position.x = cube.userData.baseX + Math.cos(elapsedTime * (cube.userData.floatSpeed * 0.7) + cube.userData.floatOffset) * 0.2;
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Handling
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // 10. Cleanup
    return () => {
      cancelAnimationFrame(animId);
      isRunning = false;
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);

      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }

      particlesGeometry.dispose();
      particlesMaterial.dispose();
      if (linesGeometry) linesGeometry.dispose();
      if (linesMaterial) linesMaterial.dispose();
      if (cubeGeometry) cubeGeometry.dispose();
      if (glassCubeMaterial) glassCubeMaterial.dispose();
      dotTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,#022c22_0%,#020617_100%)] overflow-hidden"
    />
  );
}
