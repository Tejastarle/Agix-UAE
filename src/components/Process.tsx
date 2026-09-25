import { process } from '@/lib/content';
import Reveal from './Reveal';

// A genuine 4-step sequence, so numbering is meaningful.
export default function Process() {
  return (
    <div className="relative grid gap-6 md:grid-cols-4">
      <div className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-red/0 via-red/40 to-navy/0 md:block" />
      {process.map((p, i) => (
        <Reveal key={p.title} delay={i * 0.08}>
          <div className="relative">
            <div className="relative z-10 grid h-12 w-12 place-items-center rounded-xl bg-navy font-display text-lg font-bold text-white">
              {i + 1}
            </div>
            <h3 className="mt-5 font-display text-lg font-semibold text-navy">{p.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted">{p.desc}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
