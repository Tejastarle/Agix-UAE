import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CTA from '@/components/CTA';
import { getCaseStudyBySlug, getCaseStudies } from '@/lib/data';
import { renderMarkdown } from '@/lib/markdown';
import { buildMetadata, siteConfig } from '@/lib/site';

export const revalidate = 60;

export async function generateStaticParams() {
  const cases = await getCaseStudies();
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const item = await getCaseStudyBySlug(params.slug);
  if (!item) return buildMetadata({ title: 'Case study not found', path: `/case-studies/${params.slug}` });
  return buildMetadata({
    title: item.seo_title || item.title,
    description: item.seo_description || item.summary || undefined,
    path: `/case-studies/${item.slug}`,
    image: item.cover_image?.startsWith('http') ? item.cover_image : undefined,
    type: 'article',
    publishedTime: item.created_at,
  });
}

export default async function CaseStudyPage({ params }: { params: { slug: string } }) {
  const item = await getCaseStudyBySlug(params.slug);
  if (!item) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: item.title,
    description: item.summary || '',
    image: item.cover_image || `${siteConfig.url}/og.png`,
    datePublished: item.created_at,
    dateModified: item.updated_at,
    author: { '@type': 'Organization', name: siteConfig.legalName },
    publisher: { '@type': 'Organization', name: siteConfig.legalName },
  };

  return (
    <>
      <Navbar />
      <main className="pt-28">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <article className="container-x py-12">
          <Link href="/case-studies" className="inline-flex items-center gap-2 text-sm text-muted hover:text-red">
            <ArrowLeft size={15} /> All case studies
          </Link>

          <div className="mt-6 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              {item.industry && <span className="eyebrow">{item.industry}</span>}
              <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-tight text-navy sm:text-5xl">
                {item.title}
              </h1>
              {item.client && <p className="mt-3 text-muted">Client: {item.client}</p>}
              <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">{item.summary}</p>

              {item.services && item.services.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {item.services.map((s) => (
                    <span key={s} className="rounded-full border border-line bg-mist px-3 py-1 text-xs text-navy">
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {item.metrics && item.metrics.length > 0 && (
              <div className="card grid grid-cols-1 gap-px overflow-hidden bg-line sm:grid-cols-3 lg:grid-cols-1">
                {item.metrics.map((m) => (
                  <div key={m.label} className="bg-white p-6">
                    <div className="font-display text-3xl font-extrabold text-red">{m.value}</div>
                    <div className="mt-1 text-sm text-muted">{m.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {item.cover_image && (
            <div className="relative mt-10 aspect-[16/8] overflow-hidden rounded-2xl border border-line bg-mist">
              <Image src={item.cover_image} alt={item.title} fill sizes="100vw" className="object-contain p-10" priority />
            </div>
          )}

          <div className="prose-agix mx-auto mt-10 max-w-3xl" dangerouslySetInnerHTML={{ __html: renderMarkdown(item.content || '') }} />
        </article>
        <CTA />
      </main>
      <Footer />
    </>
  );
}
