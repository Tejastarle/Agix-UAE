'use client';

import { motion } from 'framer-motion';
import { whatsappLink, siteConfig } from '@/lib/site';

// Floating WhatsApp shortcut to the UAE number.
export default function WhatsAppButton() {
  return (
    <motion.a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with AGIX on WhatsApp (${siteConfig.whatsapp})`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: 'spring', stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.08 }}
      className="group fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_14px_40px_-10px_rgba(37,211,102,0.7)]"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40" />
      <svg viewBox="0 0 32 32" width="26" height="26" fill="currentColor" className="relative" aria-hidden>
        <path d="M16.04 3C9.4 3 4 8.37 4 15c0 2.34.68 4.53 1.86 6.38L4 29l7.83-1.82A12 12 0 0 0 16.04 27C22.66 27 28 21.63 28 15S22.66 3 16.04 3Zm0 21.8c-1.86 0-3.6-.5-5.1-1.39l-.36-.21-4.65 1.08 1.1-4.52-.24-.37A9.72 9.72 0 0 1 6.3 15c0-5.38 4.37-9.76 9.74-9.76 5.37 0 9.74 4.38 9.74 9.76s-4.37 9.8-9.74 9.8Zm5.35-7.3c-.29-.15-1.73-.85-2-.95-.27-.1-.46-.15-.66.15-.2.29-.76.95-.93 1.14-.17.2-.34.22-.63.08-.29-.15-1.23-.45-2.35-1.44-.87-.77-1.45-1.72-1.62-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.51-.07-.15-.66-1.58-.9-2.16-.24-.57-.48-.49-.66-.5h-.56c-.2 0-.51.07-.78.37-.27.29-1.02 1-1.02 2.43s1.05 2.82 1.2 3.02c.15.2 2.06 3.14 4.99 4.4.7.3 1.24.48 1.66.61.7.22 1.34.19 1.84.12.56-.08 1.73-.7 1.98-1.39.24-.68.24-1.27.17-1.39-.07-.12-.27-.2-.56-.34Z" />
      </svg>
      <span className="pointer-events-none absolute right-16 whitespace-nowrap rounded-full bg-navy px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-card transition-opacity group-hover:opacity-100">
        WhatsApp {siteConfig.whatsapp}
      </span>
    </motion.a>
  );
}
