'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';

// Card that tilts in 3D toward the pointer, with a moving light sheen.
export default function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rx = useSpring(useTransform(y, [0, 1], [7, -7]), { stiffness: 200, damping: 18 });
  const ry = useSpring(useTransform(x, [0, 1], [-7, 7]), { stiffness: 200, damping: 18 });
  const sheen = useTransform(
    [x, y],
    ([gx, gy]: number[]) =>
      `radial-gradient(420px circle at ${gx * 100}% ${gy * 100}%, rgba(239,64,54,0.14), transparent 45%)`
  );

  function onMove(e: React.PointerEvent) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width);
    y.set((e.clientY - r.top) / r.height);
  }
  function onLeave() {
    x.set(0.5);
    y.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className={`group relative h-full [transform-style:preserve-3d] ${className}`}
    >
      {children}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: sheen }}
      />
    </motion.div>
  );
}
