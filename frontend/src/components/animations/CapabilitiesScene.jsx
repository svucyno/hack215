import React, { useCallback } from 'react';
import * as THREE from 'three';
import { useAnimationCanvas } from './useAnimationCanvas';

const CapabilitiesScene = () => {
  const initScene = useCallback((scene, camera, renderer) => {
    scene.clear();
    camera.position.set(0, 0.3, 7);
    camera.lookAt(0, 0, 0);

    const isMobile = window.innerWidth < 768;
    const starCount = isMobile ? 400 : 800;
    const dustCount = isMobile ? 100 : 200;
    const orbCount = 6;
    const dotCount = 20;

    // --- STAR FIELD ---
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

    // --- DUST PARTICLES ---
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

    // --- GLOBE SYSTEM ---
    const globeGroup = new THREE.Group();
    globeGroup.position.set(2.4, 0, 0);
    scene.add(globeGroup);

    // Outer Shell
    const shellGeom = new THREE.SphereGeometry(2.8, 48, 48); // Increased from 2.2
    const shellMat = new THREE.MeshBasicMaterial({ color: 0x16A34A, transparent: true, opacity: 0.06 });
    const shell = new THREE.Mesh(shellGeom, shellMat);
    globeGroup.add(shell);

    // Main Wireframe (Bright Green)
    const wireGeom = new THREE.SphereGeometry(2.8, 28, 18); // Increased from 2.2
    const wireMat = new THREE.MeshBasicMaterial({ color: 0x22C55E, wireframe: true, transparent: true, opacity: 0.55 });
    const wireGlobe = new THREE.Mesh(wireGeom, wireMat);
    globeGroup.add(wireGlobe);

    // Dense Wireframe
    const denseGeom = new THREE.SphereGeometry(2.78, 18, 12); // Increased from 2.18
    const denseMat = new THREE.MeshBasicMaterial({ color: 0x4ADE80, wireframe: true, transparent: true, opacity: 0.20 });
    const denseGlobe = new THREE.Mesh(denseGeom, denseMat);
    globeGroup.add(denseGlobe);

    // Bloom Glow
    const glowGeom = new THREE.SphereGeometry(3.2, 16, 16); // Increased from 2.5
    const glowMat = new THREE.MeshBasicMaterial({ color: 0x16A34A, transparent: true, opacity: 0.04, side: THREE.BackSide });
    const glow = new THREE.Mesh(glowGeom, glowMat);
    globeGroup.add(glow);

    // Pole Beams
    const beamGeom = new THREE.CylinderGeometry(0, 0.4, 1.8, 16, 1, true);
    const beamMat = new THREE.MeshBasicMaterial({ color: 0x22C55E, transparent: true, opacity: 0.15 });
    
    const topBeam = new THREE.Mesh(beamGeom, beamMat);
    topBeam.position.y = 3.0; // Adjusted
    globeGroup.add(topBeam);
    
    const bottomBeam = new THREE.Mesh(beamGeom, beamMat);
    bottomBeam.position.y = -3.0; // Adjusted
    bottomBeam.rotation.x = Math.PI;
    globeGroup.add(bottomBeam);

    // Orbiting Orbs
    const orbConfigs = [
        { radius: 3.4, speed: 0.8,  size: 0.12, yOffset: 0.3,  opacity: 1.0 }, // Radius increased
        { radius: 3.6, speed: -0.5, size: 0.08, yOffset: -0.5, opacity: 0.8 },
        { radius: 3.9, speed: 1.2,  size: 0.06, yOffset: 0.8,  opacity: 0.6 },
        { radius: 3.3, speed: -1.0, size: 0.10, yOffset: -0.2, opacity: 0.9 },
        { radius: 4.1, speed: 0.6,  size: 0.07, yOffset: 0.1,  opacity: 0.7 },
        { radius: 3.5, speed: -0.7, size: 0.09, yOffset: 0.5,  opacity: 0.85},
    ];
    const orbs = [];
    const orbGeom = new THREE.SphereGeometry(1, 8, 8);
    const ringGeom = new THREE.RingGeometry(1.5, 2.0, 16);

    orbConfigs.forEach(config => {
        const orbMat = new THREE.MeshBasicMaterial({ color: 0x16A34A, transparent: true, opacity: config.opacity });
        const orb = new THREE.Mesh(orbGeom, orbMat);
        orb.scale.setScalar(config.size);
        
        const ringMat = new THREE.MeshBasicMaterial({ color: 0x22C55E, transparent: true, opacity: config.opacity * 0.4, side: THREE.DoubleSide });
        const ring = new THREE.Mesh(ringGeom, ringMat);
        ring.scale.setScalar(config.size);
        orb.add(ring);
        
        scene.add(orb);
        orbs.push({ mesh: orb, ring: ring, config });
    });

    // Surface Dots
    const dotGeom = new THREE.SphereGeometry(0.055, 8, 8);
    const dotMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9 });
    const instancedDots = new THREE.InstancedMesh(dotGeom, dotMat, dotCount);
    
    const tempMatrix = new THREE.Matrix4();
    const tempPos = new THREE.Vector3();
    const nodeData = [];

    for (let i = 0; i < dotCount; i++) {
        const phi = Math.acos(1 - 2 * (i + 0.5) / dotCount);
        const theta = Math.PI * (1 + Math.sqrt(5)) * i;
        const radius = 2.82; // Increased from 2.22
        
        tempPos.set(
            Math.sin(phi) * Math.cos(theta) * radius,
            Math.cos(phi) * radius,
            Math.sin(phi) * Math.sin(theta) * radius
        );
        
        tempMatrix.setPosition(tempPos);
        instancedDots.setMatrixAt(i, tempMatrix);
        nodeData.push({ originalPos: tempPos.clone(), scale: 1, fireTimer: 0 });
    }
    globeGroup.add(instancedDots);

    // Ambient Lighting
    const amb = new THREE.AmbientLight(0x004d1a, 2);
    scene.add(amb);
    const point = new THREE.PointLight(0x22C55E, 3, 15);
    point.position.set(5, 3, 5);
    scene.add(point);

    const update = (time) => {
        // Star Twinkle
        if (Math.random() < 0.1) {
            starMat.opacity = 0.4 + 0.3 * Math.sin(time * 2);
        }

        // Dust Drift
        const dustArr = dustGeom.attributes.position.array;
        for (let i = 0; i < dustCount; i++) {
            dustArr[i * 3] += 0.002 * Math.sin(time * 0.5 + i * 0.1);
            dustArr[i * 3 + 1] += 0.001 * Math.cos(time * 0.3 + i * 0.15);
            dustArr[i * 3 + 2] += 0.001 * Math.sin(time * 0.2 + i * 0.2);
            
            if (Math.abs(dustArr[i * 3]) > 10) dustArr[i * 3] *= -0.9;
            if (Math.abs(dustArr[i * 3 + 1]) > 6) dustArr[i * 3 + 1] *= -0.9;
        }
        dustGeom.attributes.position.needsUpdate = true;

        // Globe Rotation
        globeGroup.rotation.y += 0.004;
        globeGroup.rotation.x = 0.15;

        // Beams Pulse
        beamMat.opacity = 0.08 + 0.07 * Math.sin(time * 2);

        // Orbs Orbit
        orbs.forEach(o => {
            const { radius, speed, yOffset } = o.config;
            o.mesh.position.x = globeGroup.position.x + Math.cos(time * speed) * radius;
            o.mesh.position.z = globeGroup.position.z + Math.sin(time * speed) * radius;
            o.mesh.position.y = globeGroup.position.y + yOffset + Math.sin(time * speed * 0.5) * 0.2;
            o.ring.lookAt(camera.position);
        });

        // Fire dots randomly
        if (Math.random() < 0.02) {
            const idx = Math.floor(Math.random() * dotCount);
            nodeData[idx].fireTimer = 1;
        }

        nodeData.forEach((data, i) => {
            if (data.fireTimer > 0) {
                data.fireTimer -= 0.025;
                const scale = 1 + Math.sin(data.fireTimer * Math.PI) * 2.5;
                tempMatrix.makeScale(scale, scale, scale);
                tempMatrix.setPosition(data.originalPos);
                instancedDots.setMatrixAt(i, tempMatrix);
            } else {
                tempMatrix.makeScale(1,1,1);
                tempMatrix.setPosition(data.originalPos);
                instancedDots.setMatrixAt(i, tempMatrix);
            }
        });
        instancedDots.instanceMatrix.needsUpdate = true;
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
      style={{ 
        position: 'absolute', 
        inset: 0, 
        zIndex: 0, 
        pointerEvents: 'none'
      }} 
    />
  );
};

export default CapabilitiesScene;
