import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { services } from '@/lib/content';
import Icon from './Icon';
import Reveal from './Reveal';
import TiltCard from './motion/TiltCard';

export default function ServicesGrid({ limit }: { limit?: number }) {
  const list = limit ? services.slice(0, limit) : services;
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((s, i) => {
        const body = (
          <article id={s.slug} className="card relative h-full overflow-hidden p-7 transition-shadow duration-300 group-hover:shadow-card-hover">
            <span className="pointer-events-none absolute right-5 top-4 font-display text-6xl font-extrabold text-navy/[0.04] transition-colors duration-500 group-hover:text-red/10">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="relative">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-navy/5 text-red transition-all duration-300 group-hover:rotate-[-6deg] group-hover:bg-red group-hover:text-white">
                <Icon name={s.icon} size={22} />
              </div>
              <h3 className="mt-5 flex items-center gap-2 font-display text-lg font-semibold text-navy">
                {s.title}
                {s.href && <ArrowUpRight size={16} className="text-red transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted">{s.blurb}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {s.points.map((p) => (
                  <li key={p} className="rounded-full border border-line bg-mist px-2.5 py-1 text-xs text-navy/70">
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-red to-navy transition-transform duration-500 group-hover:scale-x-100" />
          </article>
        );
        return (
          <Reveal key={s.slug} delay={(i % 3) * 0.07}>
            <TiltCard className="rounded-2xl">
              {s.href ? (
                <Link href={s.href} className="block h-full" aria-label={`${s.title} — learn more`}>
                  {body}
                </Link>
              ) : (
                body
              )}
            </TiltCard>
          </Reveal>
        );
      })}
    </div>
  );
}
