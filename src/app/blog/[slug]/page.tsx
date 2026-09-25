import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CTA from '@/components/CTA';
import { getPostBySlug, getPosts } from '@/lib/data';
import { renderMarkdown } from '@/lib/markdown';
import { buildMetadata, siteConfig } from '@/lib/site';

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return buildMetadata({ title: 'Article not found', path: `/blog/${params.slug}` });
  return buildMetadata({
    title: post.seo_title || post.title,
    description: post.seo_description || post.excerpt || undefined,
    path: `/blog/${post.slug}`,
    image: post.cover_image?.startsWith('http') ? post.cover_image : undefined,
    type: 'article',
    publishedTime: post.created_at,
    tags: post.tags || undefined,
  });
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const date = new Date(post.created_at).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt || '',
    image: post.cover_image || `${siteConfig.url}/og.png`,
    datePublished: post.created_at,
    dateModified: post.updated_at,
    author: { '@type': 'Organization', name: post.author || siteConfig.legalName },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.legalName,
      logo: { '@type': 'ImageObject', url: `${siteConfig.url}${siteConfig.logo}` },
    },
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
  };

  return (
    <>
      <Navbar />
      <main className="pt-28">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <article className="container-x max-w-3xl py-12">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted hover:text-red">
            <ArrowLeft size={15} /> All posts
          </Link>

          {post.category && (
            <div className="mt-6">
              <span className="rounded-full bg-red/10 px-2.5 py-0.5 text-xs font-medium text-red">{post.category}</span>
            </div>
          )}

          <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-tight text-navy sm:text-5xl">
            {post.title}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-muted">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} /> {date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} /> {post.read_minutes || 4} min read
            </span>
            <span>By {post.author || 'Team AGIX'}</span>
          </div>

          {post.cover_image && (
            <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl border border-line">
              <Image src={post.cover_image} alt={post.title} fill sizes="(max-width:768px) 100vw, 768px" className="object-cover" priority />
            </div>
          )}

          <div className="prose-agix mt-10" dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content || '') }} />
        </article>
        <CTA />
      </main>
      <Footer />
    </>
  );
}
