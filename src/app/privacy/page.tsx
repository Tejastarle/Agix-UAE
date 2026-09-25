import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { buildMetadata, siteConfig } from '@/lib/site';

export const metadata = buildMetadata({ title: 'Privacy Policy', path: '/privacy', description: 'How AGIX collects, uses and protects your data.' });

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28">
        <article className="container-x max-w-3xl py-12 prose-agix">
          <h1>Privacy Policy</h1>
          <p>This Privacy Policy explains how {siteConfig.legalName} (&quot;AGIX&quot;, &quot;we&quot;) collects and uses information when you use our website and services.</p>
          <h2>Information we collect</h2>
          <p>When you submit our contact form we collect your name, email, phone and any details you choose to share so we can respond to your enquiry.</p>
          <h2>How we use it</h2>
          <ul>
            <li>To respond to enquiries and provide our services.</li>
            <li>To improve our website and offering.</li>
            <li>To comply with legal obligations.</li>
          </ul>
          <h2>Your rights</h2>
          <p>You may request access to, correction of, or deletion of your personal data at any time by emailing {siteConfig.email}.</p>
          <h2>Contact</h2>
          <p>Questions? Email us at {siteConfig.email}.</p>
        </article>
      </main>
      <Footer />
    </>
  );
}
