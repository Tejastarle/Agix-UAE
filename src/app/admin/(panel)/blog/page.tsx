import Link from 'next/link';
import { Plus, Pencil, ExternalLink } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { supabaseConfigured } from '@/lib/supabase/env';
import { deletePost } from '@/lib/actions';
import DeleteButton from '@/components/admin/DeleteButton';
import type { Post } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default async function AdminBlogList() {
  let posts: Post[] = [];
  if (supabaseConfigured()) {
    const { data } = await createClient().from('posts').select('*').order('created_at', { ascending: false });
    posts = (data as Post[]) ?? [];
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-navy">Blog posts</h1>
          <p className="mt-1 text-sm text-muted">{posts.length} total</p>
        </div>
        <Link href="/admin/blog/new" className="btn-primary text-sm">
          <Plus size={15} /> New post
        </Link>
      </div>

      <div className="card mt-8 overflow-hidden">
        {posts.length === 0 ? (
          <div className="p-10 text-center text-sm text-muted">No posts yet. Create your first one.</div>
        ) : (
          <ul className="divide-y divide-line">
            {posts.map((p) => (
              <li key={p.id} className="flex items-center gap-4 p-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate font-medium text-navy">{p.title}</span>
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] ${p.published ? 'bg-red/10 text-red' : 'bg-mist text-muted'}`}>
                      {p.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-xs text-muted">/blog/{p.slug}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {p.published && (
                    <Link href={`/blog/${p.slug}`} target="_blank" className="grid h-9 w-9 place-items-center rounded-lg border border-line text-muted hover:text-navy" aria-label="View">
                      <ExternalLink size={15} />
                    </Link>
                  )}
                  <Link href={`/admin/blog/edit/${p.id}`} className="grid h-9 w-9 place-items-center rounded-lg border border-line text-muted hover:text-navy" aria-label="Edit">
                    <Pencil size={15} />
                  </Link>
                  <DeleteButton action={deletePost} id={p.id} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
