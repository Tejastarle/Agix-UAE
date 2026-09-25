import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Reveal from './Reveal';

export default function CTA() {
  return (
    <section className="container-x py-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl bg-navy p-10 text-center text-white sm:p-16">
          <div className="pointer-events-none absolute -left-16 top-0 h-64 w-64 rounded-full bg-red/25 blur-3xl" />
          <div className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-red/15 blur-3xl" />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              Let&apos;s build something worth talking about.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/75">
              Tell us about your brand and goals. We&apos;ll come back with a plan and a clear next step.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-primary">
                Get a free quote <ArrowRight size={16} />
              </Link>
              <Link href="/services" className="btn-ghost-light">
                See what we do
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
