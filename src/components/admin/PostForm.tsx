import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { TextField, TextArea, Toggle } from '@/components/admin/Fields';
import SaveButton from '@/components/admin/SaveButton';
import { savePost } from '@/lib/actions';
import type { Post } from '@/lib/types';

export default function PostForm({ post }: { post?: Post }) {
  return (
    <div>
      <Link href="/admin/blog" className="inline-flex items-center gap-2 text-sm text-muted hover:text-red">
        <ArrowLeft size={15} /> Back to posts
      </Link>
      <h1 className="mt-4 font-display text-2xl font-bold text-navy">{post ? 'Edit post' : 'New post'}</h1>

      <form action={savePost} className="mt-8 grid max-w-4xl gap-6 lg:grid-cols-[1.6fr_1fr]">
        {post && <input type="hidden" name="id" value={post.id} />}

        <div className="space-y-5">
          <TextField label="Title" name="title" defaultValue={post?.title} required />
          <TextField label="Slug" name="slug" defaultValue={post?.slug} placeholder="auto-generated from title if blank"
            hint="Lowercase, hyphenated. Leave blank to generate from the title." />
          <TextArea label="Excerpt" name="excerpt" defaultValue={post?.excerpt || ''} rows={2}
            hint="One or two sentences shown on cards and in search results." />
          <TextArea label="Content (Markdown)" name="content" defaultValue={post?.content || ''} rows={16} mono
            hint="Supports # headings, **bold**, *italic*, lists, > quotes, [links](url) and `code`." />
        </div>

        <div className="space-y-5">
          <div className="card space-y-4 p-5">
            <Toggle name="published" defaultChecked={post?.published} />
            <SaveButton label={post ? 'Update post' : 'Create post'} />
          </div>
          <div className="card space-y-4 p-5">
            <TextField label="Cover image URL" name="cover_image" defaultValue={post?.cover_image || ''} placeholder="https://… or /images/blog/…" />
            <TextField label="Category" name="category" defaultValue={post?.category || 'Digital Marketing'} />
            <TextField label="Tags" name="tags" defaultValue={(post?.tags || []).join(', ')} hint="Comma-separated" />
            <TextField label="Author" name="author" defaultValue={post?.author || 'Team AGIX'} />
            <TextField label="Read minutes" name="read_minutes" type="number" defaultValue={post?.read_minutes ?? 4} />
          </div>
          <div className="card space-y-4 p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">SEO</p>
            <TextField label="SEO title" name="seo_title" defaultValue={post?.seo_title || ''} />
            <TextArea label="SEO description" name="seo_description" defaultValue={post?.seo_description || ''} rows={3} />
          </div>
        </div>
      </form>
    </div>
  );
}
