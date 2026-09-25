'use client';

import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Particle constellation + tilted orbit rings (echoing the AGIX logo ellipse).
// Designed to sit over the hero video: sparse, glowing, additive.

const RED = '#EF4036';

function makeRing(radius: number, color: string, opacity: number) {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= 200; i++) {
    const a = (i / 200) * Math.PI * 2;
    pts.push(new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * radius * 0.4, 0));
  }
  const g = new THREE.BufferGeometry().setFromPoints(pts);
  const m = new THREE.LineBasicMaterial({ color, transparent: true, opacity, blending: THREE.AdditiveBlending });
  return new THREE.Line(g, m);
}

function Rings() {
  const group = useRef<THREE.Group>(null!);
  const rings = useMemo(
    () => [
      { line: makeRing(3.3, '#ffffff', 0.35), rot: [0.5, 0.3, 0.2] as [number, number, number] },
      { line: makeRing(2.6, RED, 0.7), rot: [-0.4, 0.3, 0.2] as [number, number, number] },
      { line: makeRing(3.9, '#8f8bff', 0.25), rot: [0.9, 0.3, 0.2] as [number, number, number] },
    ],
    []
  );
  useFrame((_, d) => {
    group.current.rotation.z += d * 0.05;
  });
  return (
    <group ref={group}>
      {rings.map((r, i) => (
        <group key={i} rotation={r.rot}>
          <primitive object={r.line} />
        </group>
      ))}
    </group>
  );
}

function Nodes({ count = 260 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!);
  const { viewport } = useThree();

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const red = new THREE.Color(RED);
    const white = new THREE.Color('#dcdcff');
    for (let i = 0; i < count; i++) {
      const r = 1.8 + Math.random() * 3.2;
      const theta = Math.acos(2 * Math.random() - 1);
      const phi = Math.random() * Math.PI * 2;
      positions.set([r * Math.sin(theta) * Math.cos(phi), r * Math.sin(theta) * Math.sin(phi) * 0.6, r * Math.cos(theta)], i * 3);
      const c = Math.random() > 0.6 ? red : white;
      colors.set([c.r, c.g, c.b], i * 3);
    }
    return { positions, colors };
  }, [count]);

  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.1;
    const px = (state.pointer.x * viewport.width) / 50;
    const py = (state.pointer.y * viewport.height) / 50;
    ref.current.position.x += (px - ref.current.position.x) * 0.04;
    ref.current.position.y += (py - ref.current.position.y) * 0.04;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.045} vertexColors transparent opacity={0.9} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

export default function OrbitField() {
  return (
    <Canvas className="!absolute inset-0" dpr={[1, 1.75]} camera={{ position: [0, 0, 8], fov: 55 }} gl={{ antialias: true, alpha: true }}>
      <Suspense fallback={null}>
        <group position={[2.2, 0, 0]}>
          <Nodes />
          <Rings />
        </group>
      </Suspense>
    </Canvas>
  );
}
