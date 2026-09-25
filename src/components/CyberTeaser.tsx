import Link from 'next/link';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import Reveal from './Reveal';
import { cyberHighlights } from '@/lib/cyber';

// Homepage band introducing the cybersecurity practice, with an animated
// radar sweep (CSS only — no second WebGL context on the homepage).
export default function CyberTeaser() {
  return (
    <section className="relative overflow-hidden bg-navy-900 py-24 text-white">
      <div className="absolute inset-0 bg-grid-light bg-[size:48px_48px] opacity-50" />
      <div className="container-x relative grid items-center gap-14 lg:grid-cols-2">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
            <ShieldCheck size={14} className="text-red" /> Cybersecurity
          </span>
          <Reveal>
            <h2 className="mt-5 font-display text-3xl font-bold leading-tight sm:text-5xl">
              Find the risk before attackers do.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-lg text-lg leading-8 text-white/75">
              Manual, research-driven security testing across web, mobile, cloud, network, IoT, OT and AI — with
              CVSS-rated reports, free retesting and fixed-price proposals within 48 hours.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <ul className="mt-8 flex flex-wrap gap-2">
              {cyberHighlights.map((h) => (
                <li key={h} className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/85">
                  {h}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.3}>
            <Link href="/cybersecurity" className="btn-primary mt-10">
              Explore cybersecurity <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>

        <Reveal>
          <div className="relative mx-auto aspect-square w-full max-w-md" aria-hidden>
            {[100, 76, 52, 28].map((s) => (
              <div
                key={s}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15"
                style={{ width: `${s}%`, height: `${s}%` }}
              />
            ))}
            <div className="absolute inset-0 rounded-full [background:conic-gradient(from_0deg,rgba(239,64,54,0.55),rgba(239,64,54,0)_22%,transparent_100%)] animate-[spin_4s_linear_infinite]" />
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/10" />
            <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-white/10" />
            {[
              ['24%', '30%', '0s'],
              ['66%', '22%', '0.8s'],
              ['72%', '64%', '1.6s'],
              ['34%', '70%', '2.4s'],
              ['52%', '46%', '3.2s'],
            ].map(([l, t, delay]) => (
              <span key={l + t} className="absolute h-2.5 w-2.5" style={{ left: l, top: t }}>
                <span className="absolute inset-0 animate-ping rounded-full bg-red" style={{ animationDelay: delay }} />
                <span className="absolute inset-0 rounded-full bg-red" />
              </span>
            ))}
            <div className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl bg-white text-navy shadow-red-glow">
              <ShieldCheck size={30} className="text-red" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
