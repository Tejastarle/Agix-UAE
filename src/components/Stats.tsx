'use client';

import { stats } from '@/lib/content';
import { motion } from 'framer-motion';
import CountUp from './motion/CountUp';

export default function Stats() {
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
          className="bg-white p-7 text-center"
        >
          <CountUp value={s.value} className="block font-display text-4xl font-extrabold text-brand-gradient sm:text-5xl" />
          <div className="mt-2 text-sm text-muted">{s.label}</div>
        </motion.div>
      ))}
    </div>
  );
}
