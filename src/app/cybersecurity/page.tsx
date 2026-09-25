import Link from 'next/link';
import { ArrowRight, Check, Star, MessageCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import Icon from '@/components/Icon';
import TiltCard from '@/components/motion/TiltCard';
import SplitText from '@/components/motion/SplitText';
import Magnetic from '@/components/motion/Magnetic';
import CyberHeroCanvas from '@/components/three/CyberHeroCanvas';
import { buildMetadata, siteConfig, whatsappLink } from '@/lib/site';
import {
  cyberServices,
  methodology,
  industries,
  whyAgix,
  engagements,
  leadership,
  cyberTestimonials,
  cyberHighlights,
} from '@/lib/cyber';

export const metadata = buildMetadata({
  title: 'Cybersecurity Services — VAPT, Red Teaming, SOC & Compliance',
  path: '/cybersecurity',
  description:
    'AGIX International cybersecurity: web, API & mobile VAPT, cloud and network security, red teaming, IoT and OT/ICS security, AI/ML audits, 24x7 SOC, forensics and ISO 27001 / SOC 2 compliance for businesses in the UAE and India.',
  tags: ['cybersecurity', 'VAPT', 'penetration testing', 'SOC', 'ISO 27001', 'red team'],
});

function cyberJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Cybersecurity services',
    name: 'AGIX Cybersecurity',
    provider: { '@type': 'Organization', name: siteConfig.legalName, url: siteConfig.url },
    areaServed: ['AE', 'IN'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Cybersecurity services',
      itemListElement: cyberServices.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.title, description: s.points.join(', ') },
      })),
    },
  };
}

export default function CybersecurityPage() {
  return (
    <>
      <Navbar />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(cyberJsonLd()) }} />

        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="relative min-h-[100svh] overflow-hidden bg-navy-900 text-white">
          <div className="absolute inset-0 bg-grad-navy" />
          <div className="absolute inset-0 bg-grid-light bg-[size:44px_44px] [mask-image:radial-gradient(80%_70%_at_70%_40%,#000_20%,transparent_75%)]" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-full lg:w-[58%]">
            <CyberHeroCanvas />
          </div>
          <div className="pointer-events-none absolute -left-20 bottom-10 h-72 w-72 rounded-full bg-red/20 blur-[110px]" />

          <div className="container-x relative z-10 flex min-h-[100svh] flex-col justify-center pb-16 pt-28">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red" /> Cybersecurity practice · 2026
            </span>
            <SplitText
              as="h1"
              text="Securing digital innovation across the modern enterprise."
              className="mt-6 max-w-3xl font-display text-4xl font-extrabold leading-[1.06] tracking-tight sm:text-6xl"
              delay={0.15}
            />
            <Reveal delay={0.5}>
              <p className="mt-6 max-w-xl text-lg leading-8 text-white/75">
                We help startups, SMEs and enterprises find, validate and fix security risk across applications,
                cloud, network, IoT and critical infrastructure — with manual, research-driven testing and reports
                your team can act on.
              </p>
            </Reveal>
            <Reveal delay={0.65}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Magnetic>
                  <Link href="/contact" className="btn-primary">
                    Request a security assessment <ArrowRight size={16} />
                  </Link>
                </Magnetic>
                <a href={whatsappLink('Hello AGIX, I would like to discuss a cybersecurity assessment.')} target="_blank" rel="noopener noreferrer" className="btn-ghost-light">
                  <MessageCircle size={16} /> WhatsApp our team
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.8}>
              <ul className="mt-14 flex max-w-2xl flex-wrap gap-2">
                {cyberHighlights.map((h) => (
                  <li key={h} className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/85 backdrop-blur">
                    {h}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-white" />
        </section>

        {/* ── Services ─────────────────────────────────────── */}
        <section className="container-x py-24">
          <SectionHeading
            eyebrow="Services"
            title="Twelve disciplines, one accountable team"
            intro="From a single application pentest to enterprise-wide red teaming and round-the-clock monitoring — every engagement is led by senior consultants who own delivery end to end."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {cyberServices.map((s, i) => (
              <Reveal key={s.title} delay={(i % 3) * 0.07}>
                <TiltCard className="rounded-2xl">
                  <article className="card h-full p-6">
                    <div className="flex items-center gap-3">
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy text-white transition-colors duration-300 group-hover:bg-red">
                        <Icon name={s.icon} size={20} />
                      </span>
                      <h3 className="font-display text-base font-semibold leading-snug text-navy">{s.title}</h3>
                    </div>
                    <ul className="mt-5 space-y-2">
                      {s.points.map((p) => (
                        <li key={p} className="flex items-start gap-2 text-sm text-muted">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-red" /> {p}
                        </li>
                      ))}
                    </ul>
                  </article>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Methodology ──────────────────────────────────── */}
        <section className="relative overflow-hidden bg-navy py-24 text-white">
          <div className="absolute inset-0 bg-grid-light bg-[size:56px_56px] opacity-60" />
          <div className="container-x relative grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
            <SectionHeading
              invert
              eyebrow="Methodology"
              title="How an assessment runs"
              intro="Fixed scope, fixed price, and a clear line from first call to closure sign-off."
            />
            <ol className="relative space-y-4 before:absolute before:bottom-6 before:left-[1.35rem] before:top-6 before:w-px before:bg-white/15">
              {methodology.map((m, i) => (
                <Reveal key={m.title} delay={i * 0.08}>
                  <li className="relative flex gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur transition-colors hover:border-red/50">
                    <span className="relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full bg-red font-display text-sm font-bold">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-display font-semibold">{m.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-white/70">{m.desc}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Why AGIX + industries ────────────────────────── */}
        <section className="container-x grid gap-16 py-24 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Why AGIX" title="Testing that finds what scanners miss" />
            <ul className="mt-10 space-y-5">
              {whyAgix.map((w, i) => (
                <Reveal key={w.title} delay={i * 0.05}>
                  <li className="flex gap-4">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-red text-white">
                      <Check size={15} />
                    </span>
                    <p className="text-muted">
                      <span className="font-semibold text-navy">{w.title}</span> — {w.desc}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow="Industries" title="Cross-sector experience" />
            <Reveal>
              <div className="mt-10 flex flex-wrap gap-3">
                {industries.map((ind) => (
                  <span key={ind} className="rounded-full border border-line bg-mist px-4 py-2 text-sm font-medium text-navy transition hover:-translate-y-0.5 hover:border-red/40 hover:text-red">
                    {ind}
                  </span>
                ))}
              </div>
            </Reveal>
            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {engagements.map((e, i) => (
                <Reveal key={e.title} delay={(i % 2) * 0.06}>
                  <div className="h-full rounded-2xl border border-line p-5 transition hover:border-navy/25 hover:shadow-card">
                    <h3 className="font-display text-sm font-semibold text-navy">{e.title}</h3>
                    <p className="mt-1.5 text-sm leading-6 text-muted">{e.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Leadership ───────────────────────────────────── */}
        <section className="bg-mist py-24">
          <div className="container-x">
            <SectionHeading eyebrow="Leadership" title="Senior people on every engagement" align="center" />
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {leadership.map((l, i) => (
                <Reveal key={l.name} delay={(i % 3) * 0.07}>
                  <div className="card flex h-full gap-4 p-6">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-navy font-display text-sm font-bold text-white">
                      {l.initials}
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-red">{l.role}</p>
                      <h3 className="mt-1 font-display font-semibold text-navy">{l.name}</h3>
                      <p className="text-xs text-muted">{l.years} experience</p>
                      <p className="mt-2 text-sm leading-6 text-muted">{l.bio}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonials + CTA ───────────────────────────── */}
        <section className="container-x py-24">
          <div className="grid gap-5 md:grid-cols-3">
            {cyberTestimonials.map((t, i) => (
              <Reveal key={t.who} delay={i * 0.08}>
                <figure className="card flex h-full flex-col p-6">
                  <div className="flex gap-0.5 text-red">
                    {Array.from({ length: 5 }).map((_, k) => (
                      <Star key={k} size={14} fill="currentColor" />
                    ))}
                  </div>
                  <blockquote className="mt-4 flex-1 text-sm leading-7 text-navy/90">“{t.quote}”</blockquote>
                  <figcaption className="mt-4 text-xs font-semibold text-muted">{t.who}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="relative mt-16 overflow-hidden rounded-3xl bg-navy p-10 text-white sm:p-14">
              <div className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 rounded-full bg-red/30 blur-3xl" />
              <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
                <div>
                  <h2 className="font-display text-3xl font-bold sm:text-4xl">Securing enterprises. Building digital trust.</h2>
                  <p className="mt-3 max-w-xl text-white/75">
                    Tell us what you need tested. You&apos;ll get a scope, timeline and fixed-price proposal within 48 hours.
                  </p>
                </div>
                <Magnetic>
                  <Link href="/contact" className="btn-primary shrink-0">
                    Get a proposal <ArrowRight size={16} />
                  </Link>
                </Magnetic>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
