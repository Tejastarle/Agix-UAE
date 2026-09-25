'use client';

import { useMemo, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// A dotted globe with animated "threat arcs" that draw across its surface —
// a visual for monitored, defended infrastructure. Brand red + navy tones.

const R = 2.2;

function fibonacciSphere(n: number, r: number) {
  const pts: THREE.Vector3[] = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const rad = Math.sqrt(1 - y * y);
    const t = phi * i;
    pts.push(new THREE.Vector3(Math.cos(t) * rad * r, y * r, Math.sin(t) * rad * r));
  }
  return pts;
}

function Dots() {
  const positions = useMemo(() => {
    const pts = fibonacciSphere(1400, R);
    const arr = new Float32Array(pts.length * 3);
    pts.forEach((p, i) => arr.set([p.x, p.y, p.z], i * 3));
    return arr;
  }, []);
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.028} color="#9ea3ff" transparent opacity={0.75} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function Arc({ seed }: { seed: number }) {
  const SEG = 64;

  const { geometry, offset, speed, line } = useMemo(() => {
    const rnd = (k: number) => {
      const x = Math.sin(seed * 999 + k * 77.7) * 10000;
      return x - Math.floor(x);
    };
    const on = (a: number, b: number) =>
      new THREE.Vector3().setFromSphericalCoords(R, Math.acos(2 * a - 1), b * Math.PI * 2);
    const start = on(rnd(1), rnd(2));
    const end = on(rnd(3), rnd(4));
    const mid = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(R * (1.35 + rnd(5) * 0.35));
    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
    const g = new THREE.BufferGeometry().setFromPoints(curve.getPoints(SEG));
    const m = new THREE.LineBasicMaterial({ color: '#EF4036', transparent: true, opacity: 0.9 });
    return { geometry: g, offset: rnd(6) * 4, speed: 0.35 + rnd(7) * 0.35, line: new THREE.Line(g, m) };
  }, [seed]);

  useFrame(({ clock }) => {
    // Draw the arc in, hold, then retract — a looping "packet" trace.
    const t = ((clock.elapsedTime * speed + offset) % 2) / 2;
    const count = Math.floor((t < 0.5 ? t * 2 : 1) * (SEG + 1));
    const startIdx = t < 0.5 ? 0 : Math.floor((t - 0.5) * 2 * (SEG + 1));
    geometry.setDrawRange(startIdx, Math.max(0, count - startIdx));
  });

  return <primitive object={line} />;
}

function Rings() {
  const ref = useRef<THREE.Group>(null!);
  useFrame((_, d) => {
    ref.current.rotation.z += d * 0.08;
  });
  return (
    <group ref={ref} rotation={[1.2, 0, 0]}>
      <mesh>
        <torusGeometry args={[R * 1.45, 0.006, 8, 180]} />
        <meshBasicMaterial color="#EF4036" transparent opacity={0.5} />
      </mesh>
      <mesh rotation={[0.35, 0.2, 0]}>
        <torusGeometry args={[R * 1.7, 0.004, 8, 180]} />
        <meshBasicMaterial color="#6f6ae0" transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

function Globe() {
  const ref = useRef<THREE.Group>(null!);
  useFrame((state, d) => {
    ref.current.rotation.y += d * 0.12;
    ref.current.rotation.x += (state.pointer.y * 0.3 - ref.current.rotation.x) * 0.04;
  });
  return (
    <group ref={ref} rotation={[0.25, 0, 0]}>
      <mesh>
        <sphereGeometry args={[R * 0.985, 48, 48]} />
        <meshBasicMaterial color="#141234" transparent opacity={0.85} />
      </mesh>
      <mesh>
        <sphereGeometry args={[R * 1.002, 24, 16]} />
        <meshBasicMaterial color="#3b3796" wireframe transparent opacity={0.18} />
      </mesh>
      <Dots />
      {Array.from({ length: 14 }).map((_, i) => (
        <Arc key={i} seed={i + 1} />
      ))}
    </group>
  );
}

export default function CyberGlobe() {
  return (
    <Canvas className="!absolute inset-0" dpr={[1, 1.75]} camera={{ position: [0, 0, 7.2], fov: 50 }} gl={{ antialias: true, alpha: true }}>
      <Suspense fallback={null}>
        <Globe />
        <Rings />
      </Suspense>
    </Canvas>
  );
}
