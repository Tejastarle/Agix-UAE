'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// A soft ring that trails the mouse and grows over links and buttons.
// Desktop mouse only; the native cursor stays visible.
export default function CursorFollower() {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const x = useSpring(useMotionValue(-100), { stiffness: 500, damping: 40 });
  const y = useSpring(useMotionValue(-100), { stiffness: 500, damping: 40 });

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return;
    setEnabled(true);
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      setHover(!!t?.closest('a, button, [role="button"], input, textarea, select'));
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, [x, y]);

  if (!enabled) return null;
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[90] rounded-full border border-red mix-blend-difference"
      style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      animate={{ width: hover ? 56 : 26, height: hover ? 56 : 26, backgroundColor: hover ? 'rgba(239,64,54,0.18)' : 'rgba(239,64,54,0)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    />
  );
}
