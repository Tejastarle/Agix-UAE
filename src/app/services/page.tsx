import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionHeading from '@/components/SectionHeading';
import ServicesGrid from '@/components/ServicesGrid';
import Process from '@/components/Process';
import CTA from '@/components/CTA';
import { buildMetadata, siteConfig } from '@/lib/site';
import { services } from '@/lib/content';

export const metadata = buildMetadata({
  title: 'Services',
  path: '/services',
  description:
    'AGIX International services: digital marketing, website & e-commerce development, branding, UI/UX, VFX, video animation, media production and cyber security for brands in the UAE.',
});

function servicesJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: services.map((s, i) => ({
      '@type': 'Service',
      position: i + 1,
      name: s.title,
      description: s.blurb,
      provider: { '@type': 'Organization', name: siteConfig.legalName },
      areaServed: 'AE',
    })),
  };
}

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd()) }}
        />
        {/* Hero band */}
        <section className="bg-navy py-20 text-white">
          <div className="container-x">
            <span className="eyebrow border-white/15 bg-white/10 text-white">Services</span>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-extrabold leading-tight sm:text-5xl">
              Everything your brand needs to grow
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/75">
              We support everything from market research and brand strategy to the implementation of
              campaigns and always-on channels.
            </p>
          </div>
        </section>

        <section className="container-x py-20">
          <ServicesGrid />
        </section>

        <section className="bg-mist py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Method"
              title="A process built for results"
              intro="Discovery, strategy, creation and growth — a repeatable path from idea to measurable impact."
            />
            <div className="mt-14">
              <Process />
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
