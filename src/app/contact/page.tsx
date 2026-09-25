import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionHeading from '@/components/SectionHeading';
import ContactForm from '@/components/ContactForm';
import { Mail, Phone, MapPin, Clock, MessageCircle } from 'lucide-react';
import { buildMetadata, siteConfig, whatsappLink, telLink } from '@/lib/site';

export const metadata = buildMetadata({
  title: 'Contact',
  path: '/contact',
  description:
    'Let’s chat about how AGIX International can support your brand. Get in touch for digital marketing, web, branding, UI/UX, VFX and cyber security in the UAE.',
});

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <section className="container-x py-16">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <SectionHeading
                eyebrow="Contact"
                title="Let's chat about your brand"
                intro="Tell us what you're working on. We’ll come back within one business day with a plan and a clear next step."
              />
              <ul className="mt-10 space-y-5">
                <Info icon={<MapPin size={18} />} label="Studio (UAE)" value={siteConfig.addressUAE} />
                <Info icon={<MapPin size={18} />} label="Office (India)" value={siteConfig.addressIN} />
                <Info icon={<Phone size={18} />} label="Phone (India)" value={siteConfig.phone} href={telLink(siteConfig.phone)} />
                <Info icon={<MessageCircle size={18} />} label="WhatsApp (UAE)" value={siteConfig.whatsapp} href={whatsappLink()} />
                <Info icon={<Mail size={18} />} label="Email" value={siteConfig.email} href={`mailto:${siteConfig.email}`} />
                <Info icon={<Clock size={18} />} label="Response time" value="Within one business day" />
              </ul>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Info({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-4">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-navy/5 text-red">{icon}</span>
      <div>
        <div className="text-xs uppercase tracking-wide text-muted">{label}</div>
        <div className="mt-0.5 text-navy">{value}</div>
      </div>
    </div>
  );
  return href ? (
    <li>
      <a href={href} className="block transition hover:opacity-80">
        {content}
      </a>
    </li>
  ) : (
    <li>{content}</li>
  );
}
