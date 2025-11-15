"use client";

import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

// Auto-rotate component
function AutoRotate() {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2; // Slow rotation
    }
  });
  
  return null;
}

// Model component
function Model({ modelPath, controlsRef }: { modelPath: string; controlsRef: React.MutableRefObject<any> }) {
  const { scene } = useGLTF(modelPath);
  const modelRef = useRef<THREE.Group>(null);
  const scaleRef = useRef<number>(1);
  const initialCenterRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const [position, setPosition] = useState<[number, number, number]>([0, 0, 0]);
  const positionRef = useRef<[number, number, number]>([0, 0, 0]);
  
  // Calculate bounding box once when scene loads
  useEffect(() => {
    if (scene) {
      const box = new THREE.Box3().setFromObject(scene);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      scaleRef.current = 4 / maxDim; // Increased scale to make model bigger (from 2 to 4)
      initialCenterRef.current.copy(center);
      const initialPos: [number, number, number] = [
        -center.x * scaleRef.current, 
        -center.y * scaleRef.current, 
        -center.z * scaleRef.current
      ];
      setPosition(initialPos);
      positionRef.current = initialPos;
    }
  }, [scene]);
  
  // Update position ref when position state changes
  useEffect(() => {
    positionRef.current = position;
  }, [position]);
  
  // Position and rotate model to face the text side (left side)
  useFrame(() => {
    if (modelRef.current) {
      // Rotate to face left (towards text) - adjust rotation as needed
      modelRef.current.rotation.y = Math.PI / 2; // 90 degrees to face left
      // Update position from ref
      modelRef.current.position.set(...positionRef.current);
    }
  });
  
  return (
    <group 
      ref={modelRef} 
      scale={[scaleRef.current, scaleRef.current, scaleRef.current]}
    >
      <primitive object={scene} />
    </group>
  );
}

// Loading fallback
function Loading() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="gray" />
    </mesh>
  );
}

export default function Model3D({ 
  modelPath, 
  className = "" 
}: { 
  modelPath: string; 
  className?: string;
}) {
  const controlsRef = useRef<any>(null);
  
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        dpr={[1, 2]}
      >
        <Suspense fallback={<Loading />}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
          <directionalLight position={[-5, -5, -5]} intensity={0.4} color="#ffffff" />
          <Model modelPath={modelPath} controlsRef={controlsRef} />
          <OrbitControls
            ref={controlsRef}
            enableZoom={true}
            enablePan={true}
            autoRotate={false}
            enableDamping={true}
            dampingFactor={0.05}
            enableRotate={true}
            panSpeed={0.8}
            // No angle restrictions for freer movement
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

