'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, animate, useReducedMotion } from 'framer-motion';

// Counts a stat like "150+" or "4.9/5" up from zero when it scrolls into view.
export default function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduce = useReducedMotion();
  const match = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
  const [shown, setShown] = useState(match ? `${match[1]}0${match[3]}` : value);

  useEffect(() => {
    if (!inView || !match) return;
    const [, pre, num, post] = match;
    const target = parseFloat(num);
    const decimals = num.includes('.') ? num.split('.')[1].length : 0;
    if (reduce) {
      setShown(value);
      return;
    }
    const controls = animate(0, target, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setShown(`${pre}${v.toFixed(decimals)}${post}`),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <span ref={ref} className={className}>
      {shown}
    </span>
  );
}
