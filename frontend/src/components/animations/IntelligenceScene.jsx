import React, { useCallback, useState, useEffect } from 'react';
import * as THREE from 'three';
import { useAnimationCanvas } from './useAnimationCanvas';

const IntelligenceScene = () => {
    const [labels, setLabels] = useState([
        { text: "हिंदी", x: 20, y: 30, offset: 0 },
        { text: "EN", x: 70, y: 25, offset: 1.2 },
        { text: "தமிழ்", x: 15, y: 65, offset: 2.5 },
        { text: "বাংলা", x: 80, y: 70, offset: 3.8 },
        { text: "తెలుగు", x: 45, y: 85, offset: 5.1 },
        { text: "اردو", x: 30, y: 15, offset: 6.4 }
    ]);

    const initScene = useCallback((scene, camera, renderer) => {
    scene.clear();
    camera.position.set(0, 0, 7);
    camera.lookAt(0, 0, 0);

    const isMobile = window.innerWidth < 768;
    const starCount = isMobile ? 400 : 800;
    const dustCount = isMobile ? 100 : 200;
    const nodeCount = isMobile ? 40 : 80;
    const connCount = isMobile ? 60 : 100;

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
        color: 0xffffff, size: 0.035, transparent: true, opacity: 1.0, sizeAttenuation: true
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
    const dustMat = new THREE.PointsMaterial({ color: 0x86EFAC, size: 0.025, transparent: true, opacity: 0.5 });
    const dust = new THREE.Points(dustGeom, dustMat);
    scene.add(dust);

    // --- NEURAL NETWORK SYSTEM ---
    const brainGroup = new THREE.Group();
    brainGroup.position.set(2.0, 0, 0);
    scene.add(brainGroup);

    // Outer Shells
    const outerShellGeom = new THREE.IcosahedronGeometry(2.6, 2); // Increased from 2.0
    const outerShellMat = new THREE.MeshBasicMaterial({ color: 0x22C55E, wireframe: true, transparent: true, opacity: 0.30 });
    const outerShell = new THREE.Mesh(outerShellGeom, outerShellMat);
    brainGroup.add(outerShell);

    const innerShellGeom = new THREE.IcosahedronGeometry(1.8, 3); // Increased from 1.4
    const innerShellMat = new THREE.MeshBasicMaterial({ color: 0x4ADE80, wireframe: true, transparent: true, opacity: 0.20 });
    const innerShell = new THREE.Mesh(innerShellGeom, innerShellMat);
    brainGroup.add(innerShell);

    // Neural Nodes (Gaussian Cluster)
    const gaussianRandom = () => {
        let u = 0, v = 0;
        while(u === 0) u = Math.random();
        while(v === 0) v = Math.random();
        return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    };

    const nodeGeom = new THREE.SphereGeometry(0.06, 8, 8);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0x4ADE80, transparent: true, opacity: 0.8 });
    const instancedNodes = new THREE.InstancedMesh(nodeGeom, nodeMat, nodeCount);
    
    const nodePositions = [];
    const tempMatrix = new THREE.Matrix4();
    const tempPos = new THREE.Vector3();
    const firingData = new Float32Array(nodeCount);

    for (let i = 0; i < nodeCount; i++) {
        const x = gaussianRandom() * 1.2;
        const y = gaussianRandom() * 0.9;
        const z = gaussianRandom() * 1.0;
        tempPos.set(x, y, z);
        nodePositions.push(tempPos.clone());
        tempMatrix.setPosition(tempPos);
        instancedNodes.setMatrixAt(i, tempMatrix);
        
        const rand = Math.random();
        const color = rand < 0.6 ? 0x22C55E : 0xffffff;
        instancedNodes.setColorAt(i, new THREE.Color(color));
    }
    brainGroup.add(instancedNodes);

    // Synaptic Connections
    const connArr = [];
    const lineMat = new THREE.LineBasicMaterial({ color: 0x4ADE80, transparent: true, opacity: 0.12 });
    
    for (let i = 0; i < connCount; i++) {
        const startIdx = Math.floor(Math.random() * nodeCount);
        let endIdx = Math.floor(Math.random() * nodeCount);
        if (startIdx === endIdx) endIdx = (startIdx + 1) % nodeCount;
        
        const lineGeom = new THREE.BufferGeometry().setFromPoints([nodePositions[startIdx], nodePositions[endIdx]]);
        const line = new THREE.Line(lineGeom, lineMat.clone());
        brainGroup.add(line);
        connArr.push({ mesh: line, start: startIdx, end: endIdx, fireDecay: 0 });
    }

    // Signals (Pulses)
    const pulseCount = 60;
    const pulses = [];
    const pulseGeom = new THREE.SphereGeometry(0.035, 6, 6);
    const pulseMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    
    for (let i = 0; i < pulseCount; i++) {
        const pulse = new THREE.Mesh(pulseGeom, pulseMat);
        pulse.visible = false;
        scene.add(pulse);
        pulses.push({ mesh: pulse, t: 0, speed: 0.04, active: false, start: null, end: null });
    }

    const update = (time) => {
        starMat.opacity = 0.4 + 0.3 * Math.sin(time * 2);

        outerShell.rotation.y += 0.003;
        outerShell.rotation.x += 0.001;
        innerShell.rotation.y -= 0.005;

        // Neural firing logic
        if (Math.random() < 0.3) {
            const idx = Math.floor(Math.random() * nodeCount);
            firingData[idx] = 1.0;
        }

        for (let i = 0; i < nodeCount; i++) {
            if (firingData[i] > 0) {
                firingData[i] -= 0.04;
                const scale = 1 + Math.sin(firingData[i] * Math.PI) * 2.5;
                instancedNodes.getMatrixAt(i, tempMatrix);
                tempMatrix.decompose(tempPos, new THREE.Quaternion(), new THREE.Vector3());
                tempMatrix.makeScale(scale, scale, scale);
                tempMatrix.setPosition(tempPos);
                instancedNodes.setMatrixAt(i, tempMatrix);

                // Spawn signals on firing
                if (firingData[i] > 0.95) {
                    const connections = connArr.filter(c => c.start === i || c.end === i).slice(0, 2);
                    connections.forEach(c => {
                        const p = pulses.find(pulse => !pulse.active);
                        if (p) {
                            p.active = true;
                            p.mesh.visible = true;
                            p.start = nodePositions[c.start].clone().applyMatrix4(brainGroup.matrixWorld);
                            p.end = nodePositions[c.end].clone().applyMatrix4(brainGroup.matrixWorld);
                            p.t = 0;
                            c.fireDecay = 1.0;
                        }
                    });
                }
            } else {
                instancedNodes.getMatrixAt(i, tempMatrix);
                tempMatrix.decompose(tempPos, new THREE.Quaternion(), new THREE.Vector3());
                tempMatrix.makeScale(1, 1, 1);
                tempMatrix.setPosition(tempPos);
                instancedNodes.setMatrixAt(i, tempMatrix);
            }
        }
        instancedNodes.instanceMatrix.needsUpdate = true;

        pulses.forEach(p => {
           if (p.active) {
                p.t += p.speed;
                if (p.t >= 1) { 
                    p.active = false; p.mesh.visible = false; 
                } else {
                    p.mesh.position.lerpVectors(p.start, p.end, p.t);
                }
           }
        });

        connArr.forEach(c => {
            if (c.fireDecay > 0) {
                c.fireDecay -= 0.02;
                c.mesh.material.opacity = 0.12 + 0.58 * c.fireDecay;
            } else {
                c.mesh.material.opacity = 0.12;
            }
        });
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
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <div 
        ref={containerRef} 
        style={{ position: 'absolute', inset: 0, zIndex: 0 }} 
      />
      {/* Floating Language Labels Overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {labels.map((l, i) => (
            <div 
                key={i}
                className="absolute px-3 py-1 rounded bg-green-500/10 border border-green-500/30 text-green-400 font-mono text-[10px] backdrop-blur-sm"
                style={{ 
                    left: `${l.x}%`, 
                    top: `${l.y}%`,
                    animation: `float-label ${3 + i}s infinite ease-in-out alternate`
                }}
            >
                {l.text}
            </div>
        ))}
      </div>
      <style>{`
        @keyframes float-label {
            0% { transform: translateY(0); opacity: 0.4; }
            100% { transform: translateY(-20px); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
};

export default IntelligenceScene;
