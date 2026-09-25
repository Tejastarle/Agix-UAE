import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Clock } from 'lucide-react';
import type { Post, CaseStudy } from '@/lib/types';

const FALLBACK = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600';

export function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="card group flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={post.cover_image || FALLBACK}
          alt={post.title}
          fill
          sizes="(max-width:768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap gap-2">
          {post.category && (
            <span className="rounded-full bg-red/10 px-2.5 py-0.5 text-xs font-medium text-red">{post.category}</span>
          )}
        </div>
        <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-navy">{post.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-6 text-muted">{post.excerpt}</p>
        <div className="mt-5 flex items-center justify-between text-xs text-muted">
          <span className="flex items-center gap-1.5">
            <Clock size={13} /> {post.read_minutes || 4} min read
          </span>
          <span className="flex items-center gap-1 font-medium text-navy group-hover:text-red">
            Read <ArrowUpRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function CaseStudyCard({ item }: { item: CaseStudy }) {
  return (
    <Link
      href={`/case-studies/${item.slug}`}
      className="card group flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-mist">
        <Image
          src={item.cover_image || FALLBACK}
          alt={item.title}
          fill
          sizes="(max-width:768px) 100vw, 50vw"
          className="object-contain p-8 transition-transform duration-500 group-hover:scale-105"
        />
        {item.industry && (
          <span className="absolute left-4 top-4 rounded-full bg-navy px-3 py-1 text-xs text-white">{item.industry}</span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-semibold leading-snug text-navy">{item.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-6 text-muted">{item.summary}</p>
        {item.metrics && item.metrics.length > 0 && (
          <div className="mt-5 grid grid-cols-3 gap-3 border-t border-line pt-5">
            {item.metrics.slice(0, 3).map((m) => (
              <div key={m.label}>
                <div className="font-display text-lg font-bold text-red">{m.value}</div>
                <div className="text-[11px] leading-tight text-muted">{m.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
