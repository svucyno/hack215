import React, { useCallback } from 'react';
import * as THREE from 'three';
import { useAnimationCanvas } from './useAnimationCanvas';

const WorkflowScene = () => {
  const initScene = useCallback((scene, camera, renderer) => {
    scene.clear();
    camera.position.set(0, 0, 7);
    camera.lookAt(0, 0, 0);

    const isMobile = window.innerWidth < 768;
    const starCount = isMobile ? 400 : 800;
    const dustCount = isMobile ? 100 : 200;
    const planetCount = 4;

    // --- SHARED STAR FIELD ---
    const starGeom = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
        starPos[i * 3] = (Math.random() - 0.5) * 30;
        starPos[i * 3 + 1] = (Math.random() - 0.5) * 20;
        starPos[i * 3 + 2] = (Math.random() - 1.0) * 12;
    }
    starGeom.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.035,
        transparent: true,
        opacity: 1.0, // Increased from 0.7
        sizeAttenuation: true
    });
    const stars = new THREE.Points(starGeom, starMat);
    scene.add(stars);

    // --- SHARED DUST PARTICLES ---
    const dustGeom = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
        dustPos[i * 3] = (Math.random() - 0.5) * 16;
        dustPos[i * 3 + 1] = (Math.random() - 0.5) * 8;
        dustPos[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    dustGeom.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({
        color: 0x86EFAC,
        size: 0.025,
        transparent: true,
        opacity: 0.5
    });
    const dust = new THREE.Points(dustGeom, dustMat);
    scene.add(dust);

    // --- SOLAR SYSTEM SYSTEM ---
    const systemGroup = new THREE.Group();
    systemGroup.position.set(2.0, 0, 0);
    scene.add(systemGroup);

    // Central Intake Sun
    const sunGeom = new THREE.SphereGeometry(0.8, 32, 32); // Increased from 0.6
    const sunMat = new THREE.MeshBasicMaterial({ color: 0x16A34A, transparent: true, opacity: 0.95 });
    const sun = new THREE.Mesh(sunGeom, sunMat);
    systemGroup.add(sun);

    const sunGlowGeom = new THREE.SphereGeometry(1.0, 16, 16); // Increased from 0.75
    const sunGlowMat = new THREE.MeshBasicMaterial({ color: 0x22C55E, transparent: true, opacity: 0.15, side: THREE.BackSide });
    const sunGlow = new THREE.Mesh(sunGlowGeom, sunGlowMat);
    systemGroup.add(sunGlow);

    // Orbital Rings
    const ringRadii = [1.4, 2.0, 2.7, 3.4];
    const ringTorusGeom = ringRadii.map(r => new THREE.TorusGeometry(r, 0.015, 4, 80));
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x22C55E, transparent: true, opacity: 0.18 });
    const rings = ringRadii.map((r, i) => {
        const ring = new THREE.Mesh(ringTorusGeom[i], ringMat);
        ring.rotation.x = Math.PI / 2 + (Math.random() - 0.5) * 0.15;
        systemGroup.add(ring);
        return ring;
    });

    // Planets (Process Stages)
    const planetConfigs = [
        { radius: 1.4, size: 0.18, color: 0x16A34A, speed: 0.6,  offset: 0 },
        { radius: 2.0, size: 0.14, color: 0x22C55E, speed: 0.4,  offset: 1 },
        { radius: 2.7, size: 0.20, color: 0x15803D, speed: 0.3,  offset: 2 },
        { radius: 3.4, size: 0.12, color: 0x4ADE80, speed: 0.5,  offset: 3 },
    ];
    const planets = [];
    planetConfigs.forEach(config => {
        const pGeom = new THREE.SphereGeometry(config.size, 16, 16);
        const pMat = new THREE.MeshPhongMaterial({ color: config.color, emissive: config.color, emissiveIntensity: 0.5 });
        const planet = new THREE.Mesh(pGeom, pMat);
        
        const haloGeom = new THREE.TorusGeometry(config.size * 2, 0.01, 4, 20);
        const haloMat = new THREE.MeshBasicMaterial({ color: config.color, transparent: true, opacity: 0.3 });
        const halo = new THREE.Mesh(haloGeom, haloMat);
        planet.add(halo);
        
        systemGroup.add(planet);
        planets.push({ mesh: planet, halo: halo, config });
    });

    // Traveling Data Particles
    const particleCount = 12;
    const particles = [];
    const partGeom = new THREE.SphereGeometry(0.04, 8, 8);
    const partMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.8 });
    
    for (let i = 0; i < particleCount; i++) {
        const mesh = new THREE.Mesh(partGeom, partMat.clone());
        scene.add(mesh);
        particles.push({
            mesh: mesh,
            targetIdx: i % planetCount,
            t: Math.random(),
            speed: 0.002 + Math.random() * 0.002
        });
    }

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    scene.add(new THREE.PointLight(0x22C55E, 3, 10));

    const update = (time) => {
        // Star Twinkle
        starMat.opacity = 0.4 + 0.3 * Math.sin(time * 2);

        // Sun Pulse
        sun.scale.setScalar(1 + 0.08 * Math.sin(time * 2));

        // Planets Orbit
        planets.forEach(p => {
            const { radius, speed, offset } = p.config;
            p.mesh.position.x = systemGroup.position.x + Math.cos(time * speed + offset) * radius;
            p.mesh.position.z = systemGroup.position.z + Math.sin(time * speed + offset) * radius;
            p.mesh.position.y = systemGroup.position.y + Math.sin(time * speed * 0.3 + offset) * 0.3;
            p.halo.lookAt(camera.position);
        });

        // Particles
        particles.forEach(p => {
            p.t += p.speed;
            if (p.t > 1) {
                p.t = 0;
                p.targetIdx = Math.floor(Math.random() * planetCount);
            }
            
            const start = systemGroup.position.clone();
            const end = planets[p.targetIdx].mesh.position.clone();
            p.mesh.position.lerpVectors(start, end, p.t);
            p.mesh.material.opacity = p.t < 0.1 ? p.t * 10 : p.t > 0.9 ? (1 - p.t) * 10 : 0.8;
        });

        dustGeom.attributes.position.array.forEach((v, i) => {
            if (i % 3 === 0) dustGeom.attributes.position.array[i] += 0.002 * Math.sin(time * 0.5 + i);
            if (i % 3 === 1) dustGeom.attributes.position.array[i] += 0.001 * Math.cos(time * 0.3 + i);
            if (i % 3 === 2) dustGeom.attributes.position.array[i] += 0.001 * Math.sin(time * 0.2 + i);
        });
        dustGeom.attributes.position.needsUpdate = true;
    };

    const dispose = () => {
        scene.traverse(obj => {
           if (obj.geometry) obj.geometry.dispose();
           if (obj.material) obj.material.dispose();
        });
    };

    return { update, dispose };
  }, []);

  const containerRef = useAnimationCanvas(initScene);

  return (
    <div 
      ref={containerRef} 
      style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} 
    />
  );
};

export default WorkflowScene;
