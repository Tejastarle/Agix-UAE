import { createPublicClient as publicClient } from '@/lib/supabase/server';
import { supabaseConfigured } from '@/lib/supabase/env';
import type { Post, CaseStudy } from '@/lib/types';

// Public reads — only PUBLISHED rows (enforced by RLS + explicit filter).
// Everything degrades gracefully to empty when Supabase isn't configured,
// so the site builds and renders before you connect a project.

export async function getPosts(limit?: number): Promise<Post[]> {
  if (!supabaseConfigured()) return [];
  let q = publicClient()
    .from('posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });
  if (limit) q = q.limit(limit);
  const { data } = await q;
  return (data as Post[]) ?? [];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!supabaseConfigured()) return null;
  const { data } = await publicClient()
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle();
  return (data as Post) ?? null;
}

export async function getCaseStudies(limit?: number): Promise<CaseStudy[]> {
  if (!supabaseConfigured()) return [];
  let q = publicClient()
    .from('case_studies')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });
  if (limit) q = q.limit(limit);
  const { data } = await q;
  return (data as CaseStudy[]) ?? [];
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  if (!supabaseConfigured()) return null;
  const { data } = await publicClient()
    .from('case_studies')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle();
  return (data as CaseStudy) ?? null;
}

export async function getAllSlugs() {
  if (!supabaseConfigured()) return { posts: [], cases: [] };
  const supabase = publicClient();
  const [{ data: posts }, { data: cases }] = await Promise.all([
    supabase.from('posts').select('slug, updated_at').eq('published', true),
    supabase.from('case_studies').select('slug, updated_at').eq('published', true),
  ]);
  return {
    posts: (posts as { slug: string; updated_at: string }[]) ?? [],
    cases: (cases as { slug: string; updated_at: string }[]) ?? [],
  };
}
