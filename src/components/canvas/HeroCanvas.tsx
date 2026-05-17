import { Canvas } from '@react-three/fiber';
import { Stars, Float, PerspectiveCamera, MeshDistortMaterial, MeshWobbleMaterial, Text } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

function HolographicPanel({ position, rotation, text }: { position: [number, number, number], rotation: [number, number, number], text: string }) {
  return (
    <Float speed={5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh position={position} rotation={rotation}>
        <planeGeometry args={[1.5, 0.8]} />
        <meshPhysicalMaterial
          transparent
          opacity={0.2}
          color="#0ea5e9"
          roughness={0}
          transmission={1}
          thickness={0.5}
        />
        <Text
          position={[0, 0, 0.01]}
          fontSize={0.1}
          color="white"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGkyMZhrib2Bg-4.ttf"
        >
          {text}
        </Text>
      </mesh>
    </Float>
  );
}

function FloatingCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.2, 64, 64]} />
        <MeshDistortMaterial
          color="#0ea5e9"
          speed={3}
          distort={0.4}
          radius={1.2}
        />
      </mesh>
      <mesh scale={[1.1, 1.1, 1.1]}>
        <sphereGeometry args={[1.2, 64, 64]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.05} />
      </mesh>
    </Float>
  );
}

function ParticleField({ count = 100 }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 10;
      p[i * 3 + 1] = (Math.random() - 0.5) * 10;
      p[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return p;
  }, [count]);

  const ref = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length / 3}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#8b5cf6" transparent opacity={0.4} />
    </points>
  );
}

export function HeroCanvas() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#0ea5e9" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#8b5cf6" />
        
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        <ParticleField count={200} />
        
        <group position={[0, 0, 0]}>
          <FloatingCore />
          <HolographicPanel position={[-3, 2, 0]} rotation={[0, 0.4, 0]} text="SYSTEM: ONLINE" />
          <HolographicPanel position={[3, -2, 1]} rotation={[0, -0.4, 0]} text="LATENCY: 14MS" />
          <HolographicPanel position={[2.5, 2.5, -1]} rotation={[0.2, -0.2, 0]} text="KERNEL_VO4" />
        </group>
      </Canvas>
    </div>
  );
}
