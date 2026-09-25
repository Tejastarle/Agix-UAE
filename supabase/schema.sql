-- ════════════════════════════════════════════════════════════════
--  AGIX (agix.ae) — Supabase schema
--  Supabase → SQL Editor → paste everything → Run. Safe to re-run.
--
--  Auth model: SUPABASE AUTH (email + password).
--  • Admin logins are ordinary Supabase Auth users.
--  • Only emails listed in public.admins may write content or read leads.
--  • Everything is enforced by Row Level Security, so the site only needs
--    the public anon / publishable key — no service-role key anywhere.
-- ════════════════════════════════════════════════════════════════

create extension if not exists "pgcrypto";

-- ─── Admin allow-list ──────────────────────────────────────────
create table if not exists public.admins (
  email text primary key,
  name text,
  created_at timestamptz default now()
);

-- Is the signed-in user an admin? Called by RLS and by the app (rpc).
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admins a
    where lower(a.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

grant execute on function public.is_admin() to anon, authenticated;

-- ─── Blog posts ────────────────────────────────────────────────
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  content text,
  cover_image text,
  category text default 'Digital Marketing',
  tags text[] default '{}',
  author text default 'Team AGIX',
  read_minutes int default 4,
  published boolean default false,
  seo_title text,
  seo_description text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ─── Case studies ──────────────────────────────────────────────
create table if not exists public.case_studies (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  client text,
  industry text,
  summary text,
  content text,
  cover_image text,
  services text[] default '{}',
  metrics jsonb default '[]'::jsonb,     -- [{"label":"...","value":"..."}]
  published boolean default false,
  seo_title text,
  seo_description text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ─── Contact leads ─────────────────────────────────────────────
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  service text,
  message text,
  created_at timestamptz default now()
);

-- keep updated_at fresh
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

drop trigger if exists posts_touch on public.posts;
create trigger posts_touch before update on public.posts
  for each row execute function public.touch_updated_at();

drop trigger if exists cs_touch on public.case_studies;
create trigger cs_touch before update on public.case_studies
  for each row execute function public.touch_updated_at();

-- ─── Row Level Security ────────────────────────────────────────
alter table public.admins       enable row level security;
alter table public.posts        enable row level security;
alter table public.case_studies enable row level security;
alter table public.leads        enable row level security;

-- Posts: public sees published; admins see and manage everything
drop policy if exists "read posts" on public.posts;
create policy "read posts" on public.posts
  for select using (published = true or public.is_admin());

drop policy if exists "admins write posts" on public.posts;
create policy "admins write posts" on public.posts
  for all using (public.is_admin()) with check (public.is_admin());

-- Case studies: same rules
drop policy if exists "read case studies" on public.case_studies;
create policy "read case studies" on public.case_studies
  for select using (published = true or public.is_admin());

drop policy if exists "admins write case studies" on public.case_studies;
create policy "admins write case studies" on public.case_studies
  for all using (public.is_admin()) with check (public.is_admin());

-- Leads: anyone may submit; only admins may read or delete
drop policy if exists "anyone submits leads" on public.leads;
create policy "anyone submits leads" on public.leads
  for insert with check (true);

drop policy if exists "admins read leads" on public.leads;
create policy "admins read leads" on public.leads
  for select using (public.is_admin());

drop policy if exists "admins delete leads" on public.leads;
create policy "admins delete leads" on public.leads
  for delete using (public.is_admin());

-- Admins table: admins can see the list; nobody writes it from the site
drop policy if exists "admins read admins" on public.admins;
create policy "admins read admins" on public.admins
  for select using (public.is_admin());

-- ════════════════════════════════════════════════════════════════
--  ADMIN ACCESS — do this once
--  1. Supabase → Authentication → Users → "Add user" → "Create new user"
--     Email: p.kumar@agix.ae (or any email)  · set a password
--     · tick "Auto Confirm User".
--  2. Make sure that email is on the allow-list (p.kumar@agix.ae already is):
--       insert into public.admins (email, name) values ('someone@agix.ae', 'Name');
--  3. Sign in at https://your-site/admin/login
-- ════════════════════════════════════════════════════════════════
insert into public.admins (email, name)
values ('p.kumar@agix.ae', 'P. Kumar')
on conflict (email) do nothing;

-- (Optional) the earlier custom-auth table is no longer used:
-- drop table if exists public.admin_users;

-- ─── Demo seed content ─────────────────────────────────────────
insert into public.posts (slug, title, excerpt, content, cover_image, category, tags, read_minutes, published, seo_title, seo_description)
values
('benefits-of-digital-marketing',
 'Benefits of Digital Marketing',
 'Why digital marketing is the highest-leverage investment a growing brand in the UAE can make today.',
 E'# Benefits of Digital Marketing\n\nDigital marketing lets brands reach the right people, at the right moment, measurably.\n\n## Reach & targeting\nUnlike traditional media, digital channels let you target by intent, location and behaviour.\n\n## Measurable ROI\nEvery dirham is trackable — from impression to lead to sale.\n\n## Always-on growth\nSEO, content and paid work around the clock to bring qualified traffic.',
 '/images/blog/blogsDM.jpeg', 'Digital Marketing',
 array['Digital Marketing','Growth','Strategy'], 5, true,
 'Benefits of Digital Marketing for UAE Brands | AGIX',
 'How digital marketing drives measurable growth for brands in the UAE — reach, targeting and ROI explained by AGIX.'),
('role-of-seo-in-digital-marketing',
 'The Role of SEO in Digital Marketing',
 'SEO is the compounding engine behind sustainable organic growth. Here is how it fits the wider strategy.',
 E'# The Role of SEO in Digital Marketing\n\nSearch engine optimization turns your website into a durable acquisition channel.\n\n## On-page\nStructure, content and intent-matched pages.\n\n## Technical\nSpeed, crawlability and structured data.\n\n## Off-page\nAuthority built through relevant links and mentions.',
 '/images/blog/blogsSEO.jpg', 'SEO',
 array['SEO','Content','Organic'], 6, true,
 'The Role of SEO in Digital Marketing | AGIX',
 'Understand how SEO powers long-term organic growth as part of a complete digital marketing strategy.'),
('why-vapt-matters-uae',
 'Why Every UAE Business Needs Regular VAPT',
 'Vulnerability assessment and penetration testing finds the exploitable gaps scanners miss — before attackers do.',
 E'# Why Every UAE Business Needs Regular VAPT\n\nAutomated scanners find known issues. Attackers chain the unknown ones.\n\n## What VAPT covers\n- Web and API applications\n- Mobile apps and backends\n- Cloud configuration and network perimeter\n\n## Why manual testing matters\nBusiness-logic flaws and chained attack paths need a human tester.\n\n## After the test\nClear CVSS-rated findings, remediation guidance and a free retest.',
 '/images/services/uiux.jpg', 'Cyber Security',
 array['Cyber Security','VAPT','Compliance'], 5, true,
 'Why UAE Businesses Need Regular VAPT | AGIX Cybersecurity',
 'How vulnerability assessment and penetration testing protects UAE businesses — scope, manual testing and remediation.')
on conflict (slug) do nothing;

insert into public.case_studies (slug, title, client, industry, summary, content, cover_image, services, metrics, published, seo_title, seo_description)
values
('sharjah-cricket-digital',
 'Scaling Digital Engagement for Sharjah Cricket',
 'Sharjah Cricket', 'Sports & Media',
 'We partnered with Sharjah Cricket to revamp their social media strategy, lifting engagement and follower growth across platforms.',
 E'## The challenge\nA storied cricket brand needed a modern, always-on digital presence.\n\n## What we did\nContent strategy, matchday social coverage and a refreshed visual identity.\n\n## The outcome\nA measurable increase in engagement and audience growth.',
 '/images/clients/sharjah-cricket.png',
 array['Digital Marketing','Social Media','Branding'],
 '[{"label":"Engagement","value":"+180%"},{"label":"Follower growth","value":"3.2x"},{"label":"Matchday reach","value":"+240%"}]'::jsonb,
 true,
 'Sharjah Cricket Digital Marketing Case Study | AGIX',
 'How AGIX scaled digital engagement and follower growth for Sharjah Cricket.'),
('rematco-energy-web',
 'A Conversion-First Website for Rematco Energy',
 'Rematco Energy', 'Energy',
 'We rebuilt Rematco Energy''s website with a focus on speed, clarity and lead generation, improving traffic and conversion.',
 E'## The challenge\nAn outdated site was not converting visitors into enquiries.\n\n## What we did\nA fast, SEO-ready website with clear service journeys and lead capture.\n\n## The outcome\nHigher traffic and improved conversion rates.',
 '/images/clients/rematco-energy.png',
 array['Website Development','SEO','UI/UX'],
 '[{"label":"Site traffic","value":"+95%"},{"label":"Conversion rate","value":"+38%"},{"label":"Load time","value":"-60%"}]'::jsonb,
 true,
 'Rematco Energy Website Case Study | AGIX',
 'How AGIX delivered a conversion-first website for Rematco Energy.')
on conflict (slug) do nothing;
