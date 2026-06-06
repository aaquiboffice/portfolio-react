import { Canvas, useFrame } from '@react-three/fiber';
import { Billboard, Text } from '@react-three/drei';
import { Suspense, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { orbitSkills } from '../data/content';
import { useIsMobile } from '../hooks/useIsMobile';

function fibonacciSphere(samples: number, radius: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < samples; i++) {
    const y = 1 - (i / (samples - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    points.push(new THREE.Vector3(Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius));
  }
  return points;
}

function SkillCloud() {
  const groupRef = useRef<THREE.Group>(null);
  const points = useMemo(() => fibonacciSphere(orbitSkills.length, 2.2), []);
  const mouse = useRef({ x: 0, y: 0 });

  useFrame(({ pointer, clock }) => {
    mouse.current.x += (pointer.x - mouse.current.x) * 0.05;
    mouse.current.y += (pointer.y - mouse.current.y) * 0.05;
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.elapsedTime * 0.15 + mouse.current.x * 0.8;
      groupRef.current.rotation.x = mouse.current.y * 0.6;
    }
  });

  return (
    <group ref={groupRef}>
      {points.map((p, i) => (
        <Billboard key={orbitSkills[i]} position={[p.x, p.y, p.z]}>
          <Text
            fontSize={0.22}
            color="#e9e4f4"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.005}
            outlineColor="#b026ff"
          >
            {orbitSkills[i]}
          </Text>
        </Billboard>
      ))}
      <mesh>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshBasicMaterial color="#b026ff" wireframe transparent opacity={0.06} />
      </mesh>
    </group>
  );
}

export default function SkillsOrb() {
  const isMobile = useIsMobile();
  return (
    <Canvas
      camera={{ position: [0, 0, isMobile ? 6.5 : 6], fov: isMobile ? 55 : 50 }}
      dpr={isMobile ? [1, 1.4] : [1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#00f0ff" />
        <pointLight position={[-5, -5, 5]} intensity={1.5} color="#b026ff" />
        <SkillCloud />
      </Suspense>
    </Canvas>
  );
}
