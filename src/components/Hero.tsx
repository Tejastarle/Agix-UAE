'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight, Pause, Play, ChevronDown, MessageCircle } from 'lucide-react';
import SplitText from './motion/SplitText';
import Magnetic from './motion/Magnetic';
import { whatsappLink } from '@/lib/site';
import { introOffset } from '@/lib/intro';

const OrbitField = dynamic(() => import('@/components/three/OrbitField'), { ssr: false });

// Hero clip: aerial Dubai skyline featuring the Museum of the Future
// (Jude Ferns, Pexels — free under the Pexels License). A local copy in
// /public/videos/hero-dubai.mp4 is preferred; the browser falls through the
// <source> list if a file is missing.
const PEXELS_CLIP = 'https://videos.pexels.com/video-files/35046256/14845836_1920_1080_30fps.mp4';
const PEXELS_POSTER =
  'https://images.pexels.com/videos/35046256/downtown-dubai-dubai-dubai-skyline-dubai-tourism-35046256.jpeg?auto=compress&w=1920';
const CUSTOM_CLIP = process.env.NEXT_PUBLIC_HERO_VIDEO_URL;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const reduce = useReducedMotion();
  const d = introOffset(); // wait for the first-visit preloader

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.25]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  function toggle() {
    const v = video.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  }

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden bg-navy-900 text-white">
      {/* Background video */}
      <motion.div className="absolute inset-0" style={reduce ? undefined : { scale: videoScale }}>
        <video
          ref={video}
          className="h-full w-full object-cover"
          autoPlay={!reduce}
          muted
          loop
          playsInline
          preload="auto"
          poster={PEXELS_POSTER}
          aria-hidden
        >
          {CUSTOM_CLIP && <source src={CUSTOM_CLIP} type="video/mp4" />}
          <source src="/videos/hero-dubai.mp4" type="video/mp4" />
          <source src={PEXELS_CLIP} type="video/mp4" />
        </video>
      </motion.div>

      {/* Legibility layers: brand-tinted gradient, vignette, grid */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-900/95 via-navy/75 to-navy/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-navy-900/60" />
      <div className="absolute inset-0 bg-grid-light bg-[size:64px_64px] opacity-40 [mask-image:linear-gradient(90deg,#000,transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        <OrbitField />
      </div>

      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="container-x relative z-10 flex min-h-[100svh] flex-col justify-center pb-24 pt-24"
      >
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: d + 0.1 }}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] backdrop-blur"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red" />
          Dubai · Sharjah · Mumbai
        </motion.span>

        <h1 className="mt-5 max-w-4xl font-display text-[2.5rem] font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.4rem]">
          <SplitText text="We build brands" delay={d + 0.2} />
          <br />
          <SplitText text="that win attention" delay={d + 0.38} className="text-red" />
          <br />
          <SplitText text="and stay secure." delay={d + 0.56} />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: d + 0.9 }}
          className="mt-6 max-w-xl text-lg leading-8 text-white/80"
        >
          AGIX International is a full-service creative, digital and cybersecurity company — marketing, web and
          e-commerce, branding, UI/UX, VFX, and enterprise security testing under one roof.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: d + 1.05 }}
          className="mt-8 flex flex-wrap items-center gap-4"
        >
          <Magnetic>
            <Link href="/contact" className="btn-primary px-7 py-3.5">
              Start a project <ArrowRight size={16} />
            </Link>
          </Magnetic>
          <Link href="/cybersecurity" className="btn-ghost-light px-7 py-3.5 backdrop-blur">
            Cybersecurity services
          </Link>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/85 underline-offset-4 hover:text-white hover:underline"
          >
            <MessageCircle size={16} /> Chat on WhatsApp
          </a>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: d + 1.3 }}
          className="mt-12 grid max-w-xl grid-cols-3 gap-6 border-t border-white/15 pt-6"
        >
          {[
            ['150+', 'Projects delivered'],
            ['12', 'Security disciplines'],
            ['10+', 'Years of expertise'],
          ].map(([v, l]) => (
            <div key={l}>
              <dt className="sr-only">{l}</dt>
              <dd className="font-display text-2xl font-bold sm:text-3xl">{v}</dd>
              <dd className="mt-1 text-xs text-white/60 sm:text-sm">{l}</dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>

      {/* Scroll cue + video control */}
      <a
        href="#clients"
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/60 hover:text-white md:flex"
      >
        Scroll
        <ChevronDown size={18} className="animate-bounce" />
      </a>
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? 'Pause background video' : 'Play background video'}
        className="absolute bottom-8 left-6 z-10 grid h-10 w-10 place-items-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
      >
        {playing ? <Pause size={15} /> : <Play size={15} />}
      </button>
    </section>
  );
}
