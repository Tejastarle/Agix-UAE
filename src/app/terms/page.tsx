import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { buildMetadata, siteConfig } from '@/lib/site';

export const metadata = buildMetadata({ title: 'Terms of Service', path: '/terms', description: 'The terms governing use of the AGIX website and services.' });

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28">
        <article className="container-x max-w-3xl py-12 prose-agix">
          <h1>Terms of Service</h1>
          <p>By accessing this website you agree to these terms. The content is provided for general information about {siteConfig.legalName} and its services.</p>
          <h2>Use of the site</h2>
          <p>You agree not to misuse the site or attempt to disrupt its operation.</p>
          <h2>Intellectual property</h2>
          <p>All content, including the AGIX name and logo, is owned by AGIX unless otherwise stated.</p>
          <h2>Liability</h2>
          <p>The site is provided &quot;as is&quot; without warranties of any kind to the extent permitted by law.</p>
          <h2>Contact</h2>
          <p>Questions about these terms? Email {siteConfig.email}.</p>
        </article>
      </main>
      <Footer />
    </>
  );
}
