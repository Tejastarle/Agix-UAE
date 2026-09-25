import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="grid min-h-[70vh] place-items-center pt-28">
        <div className="container-x text-center">
          <div className="font-display text-7xl font-extrabold text-brand-gradient">404</div>
          <h1 className="mt-4 font-display text-2xl font-semibold text-navy">Page not found</h1>
          <p className="mx-auto mt-3 max-w-md text-muted">
            The page you&apos;re looking for doesn&apos;t exist or has moved.
          </p>
          <Link href="/" className="btn-primary mt-8">Back to home</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
