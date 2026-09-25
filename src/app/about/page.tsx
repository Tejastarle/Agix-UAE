import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionHeading from '@/components/SectionHeading';
import Stats from '@/components/Stats';
import Reveal from '@/components/Reveal';
import CTA from '@/components/CTA';
import { buildMetadata } from '@/lib/site';

export const metadata = buildMetadata({
  title: 'About',
  path: '/about',
  description:
    'AGIX is a diversified professional firm combining innovation and integration — a team of dynamic marketers, designers and engineers delivering result-oriented IT and digital solutions worldwide.',
});

const values = [
  { title: 'Result-oriented', desc: 'We measure success in outcomes — reach, engagement, traffic and revenue — not vanity metrics.' },
  { title: 'Innovation & integration', desc: 'We combine creative thinking with the right technology to solve real business problems.' },
  { title: 'Client partnership', desc: 'We take time to understand your goals and work closely with you to achieve them.' },
  { title: 'Quality frame of mind', desc: 'Professionalism and craft in everything, from strategy to the final pixel.' },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <section className="container-x py-16">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="About us"
                title="Innovation and integration, in one team"
                intro="AGIX is a diversified professional firm — a team of dynamic professionals with an innovative mindset, striving to support customers worldwide."
              />
              <p className="mt-6 max-w-xl leading-8 text-muted">
                With the right quality frame of mind, we deliver result-oriented IT solutions and
                digital marketing services. We help brands succeed in a digital environment and add
                real value to their marketing plans — from entrepreneurs and consultants to large
                corporate organizations.
              </p>
            </div>
            <Reveal>
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-line">
                <Image
                  src="/images/aboutbanner.jpg"
                  alt="The AGIX team"
                  fill
                  sizes="(max-width:1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </section>

        <section className="container-x py-12">
          <Stats />
        </section>

        <section className="container-x py-20">
          <SectionHeading eyebrow="Values" title="What we stand for" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={(i % 2) * 0.08}>
                <div className="card h-full p-7">
                  <h3 className="font-display text-lg font-semibold text-navy">{v.title}</h3>
                  <p className="mt-2 leading-7 text-muted">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
