import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';
import { useIsMobile } from '../hooks/useIsMobile';

function DistortedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<any>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useFrame(({ pointer, clock }) => {
    mouse.current.x += (pointer.x - mouse.current.x) * 0.05;
    mouse.current.y += (pointer.y - mouse.current.y) * 0.05;
    if (meshRef.current) {
      meshRef.current.rotation.y = mouse.current.x * 0.6 + clock.elapsedTime * 0.08;
      meshRef.current.rotation.x = mouse.current.y * 0.4;
    }
    if (matRef.current) {
      const dist = 0.35 + (Math.abs(pointer.x) + Math.abs(pointer.y)) * 0.15;
      matRef.current.distort = THREE.MathUtils.lerp(matRef.current.distort, dist, 0.05);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <icosahedronGeometry args={[1.55, 48]} />
      <MeshDistortMaterial
        ref={matRef}
        color="#7c3aed"
        emissive="#3b0a64"
        emissiveIntensity={0.55}
        roughness={0.18}
        metalness={0.55}
        distort={0.35}
        speed={1.7}
      />
    </mesh>
  );
}

interface ShapeProps {
  position: [number, number, number];
  geometry: 'box' | 'torus' | 'octa' | 'tetra';
  color: string;
  scale?: number;
  speed?: number;
  rotationIntensity?: number;
  floatIntensity?: number;
}

function FloatingShape({ position, geometry, color, scale = 0.5, speed = 1, rotationIntensity = 1.5, floatIntensity = 2 }: ShapeProps) {
  const geo = (() => {
    switch (geometry) {
      case 'box':
        return <boxGeometry args={[1, 1, 1]} />;
      case 'torus':
        return <torusGeometry args={[0.7, 0.22, 24, 64]} />;
      case 'octa':
        return <octahedronGeometry args={[1, 0]} />;
      case 'tetra':
        return <tetrahedronGeometry args={[1, 0]} />;
    }
  })();

  return (
    <Float speed={speed} rotationIntensity={rotationIntensity} floatIntensity={floatIntensity} floatingRange={[-0.4, 0.4]}>
      <mesh position={position} scale={scale}>
        {geo}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.35}
          roughness={0.25}
          metalness={0.6}
          wireframe={geometry === 'box'}
        />
      </mesh>
    </Float>
  );
}

function CameraParallax() {
  useFrame(({ camera, pointer }) => {
    camera.position.x += (pointer.x * 0.6 - camera.position.x) * 0.04;
    camera.position.y += (-pointer.y * 0.4 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function Particles({ count = 120 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useRef<Float32Array>();
  if (!positions.current) {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
    }
    positions.current = arr;
  }
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.02;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions.current!} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#b026ff" transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

export default function HeroScene() {
  const isMobile = useIsMobile();
  return (
    <Canvas
      camera={{ position: [0, 0, isMobile ? 6 : 5], fov: isMobile ? 60 : 50 }}
      dpr={isMobile ? [1, 1.4] : [1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      className="!absolute inset-0"
    >
      <Suspense fallback={null}>
        <color attach="background" args={['#07020f']} />
        <fog attach="fog" args={['#07020f', 5, 14]} />
        <ambientLight intensity={0.35} />
        <pointLight position={[5, 5, 5]} intensity={2.5} color="#b026ff" />
        <pointLight position={[-5, -3, 4]} intensity={2} color="#00f0ff" />
        <pointLight position={[0, -4, 2]} intensity={1.2} color="#ff2d95" />

        <DistortedSphere />

        <FloatingShape position={[-2.4, 1.2, -0.5]} geometry="torus" color="#00f0ff" scale={0.55} speed={1.5} />
        <FloatingShape position={[2.6, 0.8, -1]} geometry="box" color="#b026ff" scale={0.5} speed={1.2} rotationIntensity={2} />
        <FloatingShape position={[-2.2, -1.3, -0.8]} geometry="octa" color="#ff2d95" scale={0.45} speed={1.8} />
        <FloatingShape position={[2.2, -1.1, -0.6]} geometry="tetra" color="#7c3aed" scale={0.55} speed={1.4} />
        {!isMobile && (
          <FloatingShape position={[0, 2.2, -2]} geometry="torus" color="#b026ff" scale={0.35} speed={2} />
        )}

        <Particles count={isMobile ? 60 : 140} />

        <Environment preset="night" />
        <CameraParallax />
      </Suspense>
    </Canvas>
  );
}
