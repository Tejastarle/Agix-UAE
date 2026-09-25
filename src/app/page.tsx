import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import SectionHeading from '@/components/SectionHeading';
import ServicesGrid from '@/components/ServicesGrid';
import Stats from '@/components/Stats';
import Process from '@/components/Process';
import ClientMarquee from '@/components/ClientMarquee';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';
import TextMarquee from '@/components/TextMarquee';
import CyberTeaser from '@/components/CyberTeaser';
import Reveal from '@/components/Reveal';
import { PostCard, CaseStudyCard } from '@/components/ContentCards';
import { getPosts, getCaseStudies } from '@/lib/data';
import { buildMetadata } from '@/lib/site';

export const metadata = buildMetadata({ path: '/' });
export const revalidate = 60;

export default async function HomePage() {
  const [posts, cases] = await Promise.all([getPosts(3), getCaseStudies(2)]);

  return (
    <>
      <Navbar />
      <main>
        <Hero />

        {/* Clients */}
        <section id="clients" className="container-x scroll-mt-20 py-14">
          <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Trusted by brands across the UAE & India
          </p>
          <ClientMarquee />
        </section>

        {/* Services */}
        <section className="container-x py-20">
          <SectionHeading
            eyebrow="What we do"
            title="Full-service, under one roof"
            intro="From strategy and marketing to design, development and production — the capabilities your brand needs to grow."
          />
          <div className="mt-12">
            <ServicesGrid limit={6} />
          </div>
          <Reveal className="mt-8">
            <Link href="/services" className="btn-outline">
              View all services <ArrowRight size={16} />
            </Link>
          </Reveal>
        </section>

        <TextMarquee
          items={['Digital Marketing', 'Web & E-commerce', 'Branding', 'UI/UX', 'VFX & Animation', 'Cybersecurity']}
        />

        {/* Stats */}
        <section className="container-x py-8">
          <Stats />
        </section>

        <div className="mt-20">
          <CyberTeaser />
        </div>

        {/* Process */}
        <section className="container-x py-20">
          <SectionHeading
            eyebrow="How we work"
            title="A clear path from idea to impact"
            intro="We support everything from market research and brand strategy to the implementation of campaigns and always-on channels."
          />
          <div className="mt-14">
            <Process />
          </div>
        </section>

        {/* Case studies */}
        {cases.length > 0 && (
          <section className="bg-mist py-20">
            <div className="container-x">
              <div className="flex items-end justify-between gap-6">
                <SectionHeading eyebrow="Our work" title="Results we're proud of" />
                <Link href="/case-studies" className="btn-outline hidden shrink-0 sm:inline-flex">
                  All case studies <ArrowRight size={16} />
                </Link>
              </div>
              <div className="mt-12 grid gap-5 md:grid-cols-2">
                {cases.map((c) => (
                  <CaseStudyCard key={c.id} item={c} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Testimonials */}
        <section className="container-x py-20">
          <SectionHeading eyebrow="Testimonials" title="What our clients say" />
          <div className="mt-12">
            <Testimonials />
          </div>
        </section>

        {/* Blog */}
        {posts.length > 0 && (
          <section className="container-x py-20">
            <div className="flex items-end justify-between gap-6">
              <SectionHeading
                eyebrow="Blog"
                title="Insights & ideas"
                intro="Short, useful reads on marketing, brand and growth."
              />
              <Link href="/blog" className="btn-outline hidden shrink-0 sm:inline-flex">
                All posts <ArrowRight size={16} />
              </Link>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </div>
          </section>
        )}

        <CTA />
      </main>
      <Footer />
    </>
  );
}
