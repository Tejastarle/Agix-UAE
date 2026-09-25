'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

const links = [
  { href: '/services', label: 'Services' },
  { href: '/cybersecurity', label: 'Cybersecurity' },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
];

// Pages that open with a dark (navy) hero — the navbar can float transparent
// over them at the top. Everywhere else it stays solid so it's always legible.
const DARK_HERO = ['/', '/services', '/cybersecurity', '/blog', '/case-studies'];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const overHero = DARK_HERO.includes(pathname) && !scrolled;
  const solid = !overHero;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid ? 'border-b border-line bg-white/85 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <nav className="container-x flex h-16 items-center justify-between">
        <Logo variant={solid ? 'dark' : 'light'} />

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors hover:text-red ${
                solid ? 'text-navy/80' : 'text-white/85'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/contact" className="btn-primary text-sm">
            Get a quote
          </Link>
        </div>

        <button
          className={`grid h-10 w-10 place-items-center rounded-lg border md:hidden ${
            solid ? 'border-line text-navy' : 'border-white/25 text-white'
          }`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-line bg-white md:hidden"
          >
            <div className="container-x flex flex-col gap-1 py-4">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 font-medium text-navy hover:bg-mist"
                >
                  {l.label}
                </Link>
              ))}
              <Link href="/contact" onClick={() => setOpen(false)} className="btn-primary mt-2">
                Get a quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
