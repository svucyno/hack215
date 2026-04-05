import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const useAnimationCanvas = (initScene) => {
  const containerRef = useRef(null);
  const requestRef = useRef();

  useEffect(() => {
    // Basic support check
    if (!containerRef.current) return;
    
    // Check for "prefers-reduced-motion" but don't hard-block if it's just for debugging
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      console.log('Animation disabled: prefers-reduced-motion is active.');
      // return; // Commented out for debugging
    }

    const container = containerRef.current;
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || 500; // Fallback height

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance'
    });
    
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    
    container.appendChild(renderer.domElement);
    console.log('Canvas appended to DOM:', renderer.domElement);

    const { update, dispose } = initScene(scene, camera, renderer);

    const handleResize = () => {
      const newWidth = container.clientWidth || window.innerWidth;
      const newHeight = container.clientHeight || 500;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(newWidth, newHeight);
      console.log('Resized to:', newWidth, newHeight);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    const animate = (time) => {
      update(time * 0.001);
      renderer.render(scene, camera);
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      console.log('Cleaning up animation...');
      cancelAnimationFrame(requestRef.current);
      resizeObserver.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      dispose();
      renderer.dispose();
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach((mat) => mat.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
    };
  }, [initScene]);

  return containerRef;
};
