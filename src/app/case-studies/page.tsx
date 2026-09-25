import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CaseStudyCard } from '@/components/ContentCards';
import CTA from '@/components/CTA';
import { getCaseStudies } from '@/lib/data';
import { buildMetadata } from '@/lib/site';

export const metadata = buildMetadata({
  title: 'Case Studies',
  path: '/case-studies',
  description:
    'See how AGIX delivers results across digital marketing, web, branding and more — for clients like Sharjah Cricket and Rematco Energy.',
});

export const revalidate = 60;

export default async function CaseStudiesPage() {
  const cases = await getCaseStudies();

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <section className="bg-navy py-20 text-white">
          <div className="container-x">
            <span className="eyebrow border-white/15 bg-white/10 text-white">Our work</span>
            <h1 className="mt-4 font-display text-4xl font-extrabold sm:text-5xl">Case studies</h1>
            <p className="mt-4 max-w-2xl text-lg text-white/75">
              Real projects, real outcomes. A look at the work we&apos;ve delivered for brands we&apos;re proud to partner with.
            </p>
          </div>
        </section>

        <section className="container-x py-16">
          {cases.length === 0 ? (
            <div className="card p-12 text-center">
              <h3 className="font-display text-lg font-semibold text-navy">No case studies yet</h3>
              <p className="mt-2 text-muted">Connect Supabase and publish your first case study from the admin panel.</p>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {cases.map((c) => (
                <CaseStudyCard key={c.id} item={c} />
              ))}
            </div>
          )}
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
