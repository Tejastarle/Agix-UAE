'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient, getAdmin } from '@/lib/supabase/server';

// Every mutating action re-checks the admin server-side. Writes run with the
// admin's own Supabase session, so RLS (public.is_admin()) is the final gate.
async function requireAdmin() {
  const { user, isAdmin } = await getAdmin();
  if (!user) redirect('/admin/login');
  if (!isAdmin) redirect('/admin/login?error=not-admin');
  return user;
}

const adminClient = () => createClient();

// ─── Auth ──────────────────────────────────────────────────────
export async function signOut() {
  await createClient().auth.signOut();
  redirect('/admin/login');
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80);
}

function parseList(v: FormDataEntryValue | null): string[] {
  return String(v || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

// ─── Posts ─────────────────────────────────────────────────────
export async function savePost(formData: FormData) {
  await requireAdmin();
  const supabase = adminClient();
  const id = String(formData.get('id') || '');
  const title = String(formData.get('title') || '').trim();
  const slug = slugify(String(formData.get('slug') || '') || title);

  const payload = {
    slug,
    title,
    excerpt: String(formData.get('excerpt') || '').trim() || null,
    content: String(formData.get('content') || ''),
    cover_image: String(formData.get('cover_image') || '').trim() || null,
    category: String(formData.get('category') || 'Digital Marketing').trim(),
    tags: parseList(formData.get('tags')),
    author: String(formData.get('author') || 'Team AGIX').trim(),
    read_minutes: Number(formData.get('read_minutes') || 4),
    published: formData.get('published') === 'on',
    seo_title: String(formData.get('seo_title') || '').trim() || null,
    seo_description: String(formData.get('seo_description') || '').trim() || null,
  };

  if (id) await supabase.from('posts').update(payload).eq('id', id);
  else await supabase.from('posts').insert(payload);

  revalidatePath('/admin/blog');
  revalidatePath('/blog');
  revalidatePath('/');
  redirect('/admin/blog');
}

export async function deletePost(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get('id') || '');
  if (id) await adminClient().from('posts').delete().eq('id', id);
  revalidatePath('/admin/blog');
  revalidatePath('/blog');
}

// ─── Case studies ──────────────────────────────────────────────
export async function saveCaseStudy(formData: FormData) {
  await requireAdmin();
  const supabase = adminClient();
  const id = String(formData.get('id') || '');
  const title = String(formData.get('title') || '').trim();
  const slug = slugify(String(formData.get('slug') || '') || title);

  let metrics: unknown = [];
  try {
    metrics = JSON.parse(String(formData.get('metrics') || '[]'));
  } catch {
    metrics = [];
  }

  const payload = {
    slug,
    title,
    client: String(formData.get('client') || '').trim() || null,
    industry: String(formData.get('industry') || '').trim() || null,
    summary: String(formData.get('summary') || '').trim() || null,
    content: String(formData.get('content') || ''),
    cover_image: String(formData.get('cover_image') || '').trim() || null,
    services: parseList(formData.get('services')),
    metrics,
    published: formData.get('published') === 'on',
    seo_title: String(formData.get('seo_title') || '').trim() || null,
    seo_description: String(formData.get('seo_description') || '').trim() || null,
  };

  if (id) await supabase.from('case_studies').update(payload).eq('id', id);
  else await supabase.from('case_studies').insert(payload);

  revalidatePath('/admin/case-studies');
  revalidatePath('/case-studies');
  revalidatePath('/');
  redirect('/admin/case-studies');
}

export async function deleteCaseStudy(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get('id') || '');
  if (id) await adminClient().from('case_studies').delete().eq('id', id);
  revalidatePath('/admin/case-studies');
  revalidatePath('/case-studies');
}
