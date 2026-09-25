import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { supabaseConfigured } from '@/lib/supabase/env';
import { FileText, Briefcase, Inbox, Plus } from 'lucide-react';
import type { Lead } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  let postCount = 0;
  let caseCount = 0;
  let leadCount = 0;
  let recentLeads: Lead[] = [];

  if (supabaseConfigured()) {
    const supabase = createClient();
    const [posts, cases, leads, recent] = await Promise.all([
      supabase.from('posts').select('id', { count: 'exact', head: true }),
      supabase.from('case_studies').select('id', { count: 'exact', head: true }),
      supabase.from('leads').select('id', { count: 'exact', head: true }),
      supabase.from('leads').select('*').order('created_at', { ascending: false }).limit(8),
    ]);
    postCount = posts.count ?? 0;
    caseCount = cases.count ?? 0;
    leadCount = leads.count ?? 0;
    recentLeads = (recent.data as Lead[]) ?? [];
  }

  const cards = [
    { label: 'Blog posts', value: postCount, icon: FileText, href: '/admin/blog' },
    { label: 'Case studies', value: caseCount, icon: Briefcase, href: '/admin/case-studies' },
    { label: 'Leads captured', value: leadCount, icon: Inbox, href: '/admin' },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-navy">Dashboard</h1>
          <p className="mt-1 text-sm text-muted">Manage content and review inbound leads.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/blog/new" className="btn-outline text-sm">
            <Plus size={15} /> New post
          </Link>
          <Link href="/admin/case-studies/new" className="btn-primary text-sm">
            <Plus size={15} /> New case study
          </Link>
        </div>
      </div>

      {!supabaseConfigured() && (
        <div className="mt-6 rounded-xl border border-red/30 bg-red/5 p-4 text-sm text-navy">
          Supabase is not connected. Add <code className="rounded bg-white px-1">NEXT_PUBLIC_SUPABASE_URL</code> and{' '}
          <code className="rounded bg-white px-1">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to <code className="rounded bg-white px-1">.env.local</code>.
        </div>
      )}

      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        {cards.map((c) => (
          <Link key={c.label} href={c.href} className="card p-6 transition hover:border-red/30 hover:shadow-card-hover">
            <div className="flex items-center justify-between">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy/5 text-red">
                <c.icon size={20} />
              </span>
              <span className="font-display text-3xl font-extrabold text-brand-gradient">{c.value}</span>
            </div>
            <div className="mt-4 text-sm text-muted">{c.label}</div>
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="font-display text-lg font-semibold text-navy">Recent leads</h2>
        <div className="card mt-4 overflow-hidden">
          {recentLeads.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-line text-left text-muted">
                    <th className="px-5 py-3 font-medium">Name</th>
                    <th className="px-5 py-3 font-medium">Email</th>
                    <th className="hidden px-5 py-3 font-medium sm:table-cell">Service</th>
                    <th className="hidden px-5 py-3 font-medium md:table-cell">Phone</th>
                    <th className="px-5 py-3 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentLeads.map((l) => (
                    <tr key={l.id} className="border-b border-line/60 last:border-0">
                      <td className="px-5 py-3 text-navy">{l.name}</td>
                      <td className="px-5 py-3 text-muted">{l.email}</td>
                      <td className="hidden px-5 py-3 text-muted sm:table-cell">{l.service || '—'}</td>
                      <td className="hidden px-5 py-3 text-muted md:table-cell">{l.phone || '—'}</td>
                      <td className="px-5 py-3 text-muted">{new Date(l.created_at).toLocaleDateString('en-GB')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center text-sm text-muted">
              No leads yet. Submissions from the contact form will appear here.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
