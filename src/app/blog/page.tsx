import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionHeading from '@/components/SectionHeading';
import { PostCard } from '@/components/ContentCards';
import { getPosts } from '@/lib/data';
import { buildMetadata } from '@/lib/site';

export const metadata = buildMetadata({
  title: 'Blog',
  path: '/blog',
  description:
    'Insights on digital marketing, SEO, branding and growth from the AGIX International team — short, useful reads for brands in the UAE.',
});

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <section className="bg-navy py-20 text-white">
          <div className="container-x">
            <span className="eyebrow border-white/15 bg-white/10 text-white">Blog</span>
            <h1 className="mt-4 font-display text-4xl font-extrabold sm:text-5xl">Insights & ideas</h1>
            <p className="mt-4 max-w-2xl text-lg text-white/75">
              Short, clear reads on marketing, brand and growth — no hype, just what matters.
            </p>
          </div>
        </section>

        <section className="container-x py-16">
          {posts.length === 0 ? (
            <div className="card p-12 text-center">
              <h3 className="font-display text-lg font-semibold text-navy">No posts yet</h3>
              <p className="mt-2 text-muted">Connect Supabase and publish your first article from the admin panel.</p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
