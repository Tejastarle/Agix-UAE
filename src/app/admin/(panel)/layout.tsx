import Link from 'next/link';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { getAdmin } from '@/lib/supabase/server';
import { signOut } from '@/lib/actions';
import { LayoutDashboard, FileText, Briefcase, LogOut, ExternalLink, ShieldAlert } from 'lucide-react';

export const dynamic = 'force-dynamic';

const nav = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/blog', label: 'Blog posts', icon: FileText },
  { href: '/admin/case-studies', label: 'Case studies', icon: Briefcase },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isAdmin } = await getAdmin();
  if (!user) redirect('/admin/login');

  // Signed in, but not on the admins allow-list: explain instead of showing the panel.
  if (!isAdmin) {
    return (
      <main className="grid min-h-screen place-items-center bg-mist px-5">
        <div className="card max-w-md p-8 text-center">
          <ShieldAlert className="mx-auto text-red" size={36} />
          <h1 className="mt-4 font-display text-xl font-bold text-navy">This account isn&apos;t an admin</h1>
          <p className="mt-2 text-sm leading-6 text-muted">
            <span className="font-medium text-navy">{user.email}</span> signed in, but it isn&apos;t on the admin
            list. Add it in Supabase with{' '}
            <code className="rounded bg-mist px-1">insert into public.admins (email) values (&apos;…&apos;)</code>, then
            sign in again.
          </p>
          <form action={signOut}>
            <button className="btn-primary mt-6">Sign out</button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-mist">
      <div className="mx-auto flex max-w-[1400px]">
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-line bg-white p-5 md:flex">
          <Link href="/admin" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-mist">
              <Image src="/images/logos/agix-logo.png" alt="AGIX" width={28} height={28} className="object-contain" />
            </span>
            <span className="font-display font-extrabold text-navy">AGIX Admin</span>
          </Link>

          <nav className="mt-8 flex flex-1 flex-col gap-1">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted transition hover:bg-mist hover:text-navy">
                <n.icon size={17} /> {n.label}
              </Link>
            ))}
            <Link href="/" target="_blank" className="mt-2 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted transition hover:bg-mist hover:text-navy">
              <ExternalLink size={17} /> View site
            </Link>
          </nav>

          <div className="border-t border-line pt-4">
            <p className="truncate px-3 text-xs text-muted">
              Signed in as <span className="font-medium text-navy">{user.email}</span>
            </p>
            <form action={signOut}>
              <button className="mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted transition hover:bg-mist hover:text-red">
                <LogOut size={17} /> Sign out
              </button>
            </form>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between border-b border-line bg-white p-4 md:hidden">
            <Link href="/admin" className="flex items-center gap-2">
              <Image src="/images/logos/agix-logo.png" alt="AGIX" width={26} height={26} className="object-contain" />
              <span className="font-display text-sm font-extrabold text-navy">AGIX Admin</span>
            </Link>
            <form action={signOut}>
              <button className="text-sm text-muted">Sign out</button>
            </form>
          </div>
          <div className="flex gap-2 overflow-x-auto border-b border-line bg-white p-3 md:hidden">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className="whitespace-nowrap rounded-lg border border-line px-3 py-1.5 text-xs text-navy">
                {n.label}
              </Link>
            ))}
          </div>
          <div className="p-6 lg:p-10">{children}</div>
        </div>
      </div>
    </div>
  );
}
