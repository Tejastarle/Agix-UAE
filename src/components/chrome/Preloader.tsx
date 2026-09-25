'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { INTRO_SECONDS } from '@/lib/intro';

// Brand curtain: logo draws in, a red bar fills, then the panel lifts away.
// Server-rendered but hidden by CSS unless <html data-intro="1">.
export default function Preloader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (document.documentElement.dataset.intro !== '1') {
      setShow(false);
      return;
    }
    const t = setTimeout(() => setShow(false), INTRO_SECONDS * 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          id="agix-preloader"
          className="fixed inset-0 z-[100] grid place-items-center bg-navy-900"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden
        >
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.6, opacity: 0, rotate: -12 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="grid h-20 w-20 place-items-center rounded-2xl bg-white shadow-red-glow"
            >
              <Image src="/images/logos/agix-logo.png" alt="" width={60} height={60} priority className="object-contain" />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, letterSpacing: '0.6em' }}
              animate={{ opacity: 1, letterSpacing: '0.32em' }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 font-display text-sm font-semibold uppercase text-white"
            >
              AGIX
            </motion.p>
            <div className="mt-5 h-[2px] w-40 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full bg-red"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: INTRO_SECONDS - 0.15, ease: 'easeInOut' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
