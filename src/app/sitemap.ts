import type { MetadataRoute } from 'next';
import { getAllSlugs } from '@/lib/data';
import { siteConfig } from '@/lib/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/cybersecurity`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/case-studies`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${base}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
  ];

  const { posts, cases } = await getAllSlugs();

  const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.updated_at),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const caseRoutes: MetadataRoute.Sitemap = cases.map((c) => ({
    url: `${base}/case-studies/${c.slug}`,
    lastModified: new Date(c.updated_at),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...postRoutes, ...caseRoutes];
}
