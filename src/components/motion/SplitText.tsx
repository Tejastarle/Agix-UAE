'use client';

import { motion, useReducedMotion } from 'framer-motion';

// Reveals a headline word by word, each word rising out of a clipped line.
export default function SplitText({
  text,
  className,
  delay = 0,
  stagger = 0.06,
  as = 'span',
  inView = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: 'span' | 'h1' | 'h2';
  inView?: boolean;
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  const words = text.split(' ');
  const trigger = inView
    ? { whileInView: 'show', viewport: { once: true, margin: '-60px' } }
    : { animate: 'show' };

  return (
    <Tag className={className} initial="hidden" {...trigger} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className="inline-block"
            variants={{
              hidden: reduce ? { opacity: 0 } : { y: '110%', rotate: 4 },
              show: { y: '0%', rotate: 0, opacity: 1 },
            }}
            transition={{ duration: 0.8, delay: delay + i * stagger, ease: [0.22, 1, 0.36, 1] }}
          >
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
