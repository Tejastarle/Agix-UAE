'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

// Inertial smooth scrolling (skipped for reduced-motion users).
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4), smoothWheel: true });
    let id = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      id = requestAnimationFrame(raf);
    };
    id = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);
  return null;
}
