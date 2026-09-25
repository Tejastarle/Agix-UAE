# AGIX — agix.ae

Premium website for **AGIX**: official red `#EF4036` + navy `#262262` brand, the AGIX logo, all agency services, a dedicated **Cybersecurity** practice page, a **Dubai aerial video hero**, heavy **Three.js + Framer Motion** animation, a **Supabase-authenticated admin panel** for blogs, case studies and leads, and full technical SEO.

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Supabase (Auth + Postgres + RLS) · Three.js / react-three-fiber · Framer Motion · Lenis smooth scroll.

---

## What's inside

| Area | Details |
|---|---|
| **Home** | Full-screen Dubai drone video (Museum of the Future skyline) with brand overlay, Three.js orbit-particle layer, word-by-word headline, scroll parallax, pause control |
| **Motion system** | First-visit logo preloader, Lenis smooth scroll, top scroll-progress bar, cursor follower ring, 3D tilt cards, magnetic CTAs, count-up stats, split-text headings, outlined text marquee, CSS radar sweep |
| **Cybersecurity** (`/cybersecurity`) | 3D threat-arc globe hero, 12 service disciplines, 5-step methodology, why AGIX, industries, engagement scenarios, leadership, testimonials — condensed from the 2026 Cybersecurity Profile |
| **Services** | Digital Marketing, Website Development, Branding & Communication, E-commerce, UI/UX, VFX, Video Animation, Media Production, Cybersecurity |
| **Content** | Blog + case studies from Supabase (ISR every 60s), contact form → `leads` table |
| **Admin** (`/admin`) | Supabase Auth email + password, admins allow-list, dashboard, blog & case-study CRUD, leads inbox, forgot/reset password |
| **Contact** | Email `p.kumar@agix.ae` · Phone `+91 99878 75288` · WhatsApp `+971 50 436 7362` (floating button on every page) |
| **SEO** | Per-page metadata, canonical URLs, Open Graph/Twitter, JSON-LD (Organization + ContactPoints, WebSite, Service catalog, BlogPosting, Article), dynamic sitemap, robots, manifest |

---

## 1 · Install & run

```bash
npm install
npm run dev        # http://localhost:3000
```

`.env.local` is already filled in with your Supabase project:

```env
NEXT_PUBLIC_SUPABASE_URL=https://fmutxkwbeknrdzfufdgb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...        # public anon key
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...   # used if the anon key is removed
NEXT_PUBLIC_SITE_URL=https://agix.ae
NEXT_PUBLIC_HERO_VIDEO_URL=                         # optional
```

Only the **public** key is needed. Admin permissions are enforced in the database by Row Level Security — there is no secret/service-role key in this project.

## 2 · Set up the database (once)

Supabase → **SQL Editor** → paste all of [`supabase/schema.sql`](./supabase/schema.sql) → **Run**.

It creates `admins`, `posts`, `case_studies`, `leads`, the `is_admin()` function, RLS policies and demo content, and puts **p.kumar@agix.ae** on the admin list.

## 3 · Create the admin login (once)

1. Supabase → **Authentication → Users → Add user → Create new user**
2. Email `p.kumar@agix.ae`, choose a password, tick **Auto Confirm User**.
3. Sign in at **`/admin/login`**.

To add more admins: create their user the same way, then run
`insert into public.admins (email, name) values ('name@agix.ae', 'Name');`

Anyone who signs in but is **not** on the list sees an "account isn't an admin" screen and cannot read or write anything — the database refuses it.

**Password reset:** "Forgot password?" on the login page emails a link. Add your site URL under Supabase → Authentication → **URL Configuration** (Site URL `https://agix.ae`, redirect `https://agix.ae/admin/login`, plus `http://localhost:3000/admin/login` for local testing).

## 4 · Hero video

The hero plays, in order of preference:

1. `NEXT_PUBLIC_HERO_VIDEO_URL`, if set
2. `public/videos/hero-dubai.mp4`, if present (**recommended**)
3. The Pexels clip [Iconic Dubai Skyline Featuring Future Museum](https://www.pexels.com/video/iconic-dubai-skyline-featuring-future-museum-35046256/) by Jude Ferns, streamed from Pexels (free under the Pexels License)

For production, download that clip (1920×1080) from the link above and save it as `public/videos/hero-dubai.mp4` so it's served from your own domain. To use your own drone shoot, drop it in the same place. Keep it muted, H.264, ideally under 8 MB.

Visitors with "reduce motion" enabled get a still frame; everyone gets a pause button.

## 5 · Deploy

Vercel: import the repo, add the env variables from step 1, deploy, set your domain, then submit `https://agix.ae/sitemap.xml` in Google Search Console.

---

## Project map

```
src/
├─ app/
│  ├─ page.tsx                     Home (video hero, services, cyber teaser, work, testimonials, blog)
│  ├─ cybersecurity/               Cybersecurity practice page
│  ├─ services · about · contact · blog · case-studies · privacy · terms
│  ├─ admin/login                  Supabase email/password sign-in + reset
│  ├─ admin/(panel)                Protected dashboard + CRUD
│  ├─ api/lead                     Contact form endpoint
│  └─ sitemap.ts · robots.ts · manifest.ts
├─ components/
│  ├─ chrome/                      Preloader, SmoothScroll, ScrollProgress, CursorFollower, WhatsAppButton
│  ├─ motion/                      SplitText, TiltCard, Magnetic, CountUp
│  ├─ three/                       OrbitField (hero), CyberGlobe (cyber page)
│  └─ admin/                       Forms and controls
└─ lib/
   ├─ supabase/                    env · browser client · server client · middleware
   ├─ site.ts                      Brand, contact details, SEO helpers, WhatsApp link
   ├─ content.ts · cyber.ts        Marketing and cybersecurity copy
   └─ actions.ts · data.ts         Admin writes (RLS-checked) and public reads
supabase/schema.sql                One-shot database setup
```

## Customise

- Contact details, social links, keywords → `src/lib/site.ts`
- Services, stats, testimonials, clients → `src/lib/content.ts`
- Cybersecurity content → `src/lib/cyber.ts`
- Colours & fonts → `tailwind.config.ts`, `src/app/globals.css`

All motion respects the visitor's reduced-motion setting.
