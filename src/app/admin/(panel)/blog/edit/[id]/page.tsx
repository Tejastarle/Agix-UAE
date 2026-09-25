import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { supabaseConfigured } from '@/lib/supabase/env';
import PostForm from '@/components/admin/PostForm';
import type { Post } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default async function EditPostPage({ params }: { params: { id: string } }) {
  if (!supabaseConfigured()) notFound();
  const { data } = await createClient().from('posts').select('*').eq('id', params.id).maybeSingle();
  if (!data) notFound();
  return <PostForm post={data as Post} />;
}
