import Link from 'next/link';
import { Plus, Pencil, ExternalLink } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { supabaseConfigured } from '@/lib/supabase/env';
import { deleteCaseStudy } from '@/lib/actions';
import DeleteButton from '@/components/admin/DeleteButton';
import type { CaseStudy } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default async function AdminCaseList() {
  let items: CaseStudy[] = [];
  if (supabaseConfigured()) {
    const { data } = await createClient().from('case_studies').select('*').order('created_at', { ascending: false });
    items = (data as CaseStudy[]) ?? [];
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-navy">Case studies</h1>
          <p className="mt-1 text-sm text-muted">{items.length} total</p>
        </div>
        <Link href="/admin/case-studies/new" className="btn-primary text-sm">
          <Plus size={15} /> New case study
        </Link>
      </div>

      <div className="card mt-8 overflow-hidden">
        {items.length === 0 ? (
          <div className="p-10 text-center text-sm text-muted">No case studies yet. Create your first one.</div>
        ) : (
          <ul className="divide-y divide-line">
            {items.map((c) => (
              <li key={c.id} className="flex items-center gap-4 p-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate font-medium text-navy">{c.title}</span>
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] ${c.published ? 'bg-red/10 text-red' : 'bg-mist text-muted'}`}>
                      {c.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-xs text-muted">{c.industry || 'Uncategorised'} · /case-studies/{c.slug}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {c.published && (
                    <Link href={`/case-studies/${c.slug}`} target="_blank" className="grid h-9 w-9 place-items-center rounded-lg border border-line text-muted hover:text-navy" aria-label="View">
                      <ExternalLink size={15} />
                    </Link>
                  )}
                  <Link href={`/admin/case-studies/edit/${c.id}`} className="grid h-9 w-9 place-items-center rounded-lg border border-line text-muted hover:text-navy" aria-label="Edit">
                    <Pencil size={15} />
                  </Link>
                  <DeleteButton action={deleteCaseStudy} id={c.id} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
