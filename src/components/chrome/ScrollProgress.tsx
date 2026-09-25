'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

// Thin brand-gradient bar across the top showing reading progress.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 24, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-red via-red to-[#8f8bff]"
    />
  );
}
