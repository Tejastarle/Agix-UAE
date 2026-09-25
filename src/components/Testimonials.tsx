import { testimonials } from '@/lib/content';
import Reveal from './Reveal';
import { Quote } from 'lucide-react';

export default function Testimonials() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {testimonials.map((t, i) => (
        <Reveal key={i} delay={(i % 2) * 0.08}>
          <figure className="card flex h-full flex-col p-7">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-red text-white">
              <Quote size={18} />
            </span>
            <blockquote className="mt-4 flex-1 text-[0.975rem] leading-7 text-navy/90">
              {t.quote}
            </blockquote>
            <figcaption className="mt-6 border-t border-line pt-4">
              <div className="font-display text-sm font-semibold text-navy">{t.name}</div>
              <div className="text-xs text-muted">
                {t.role} · {t.company}
              </div>
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  );
}
