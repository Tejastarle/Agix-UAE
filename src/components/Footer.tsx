import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Facebook, Linkedin, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { siteConfig, whatsappLink, telLink } from '@/lib/site';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative bg-navy text-white">
      <div className="container-x grid gap-12 py-16 md:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-white">
              <Image src="/images/logos/agix-logo.png" alt="AGIX International" width={32} height={32} className="object-contain" />
            </span>
            <span className="font-display text-lg font-extrabold">AGIX International</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-6 text-white/70">
            A full-service creative and digital agency. We support everything from research and
            brand strategy to campaigns, always-on channels and production.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a href={siteConfig.social.instagram} aria-label="Instagram" className="grid h-9 w-9 place-items-center rounded-lg border border-white/15 text-white/80 transition hover:border-red hover:text-white">
              <Instagram size={16} />
            </a>
            <a href={siteConfig.social.facebook} aria-label="Facebook" className="grid h-9 w-9 place-items-center rounded-lg border border-white/15 text-white/80 transition hover:border-red hover:text-white">
              <Facebook size={16} />
            </a>
            <a href={siteConfig.social.linkedin} aria-label="LinkedIn" className="grid h-9 w-9 place-items-center rounded-lg border border-white/15 text-white/80 transition hover:border-red hover:text-white">
              <Linkedin size={16} />
            </a>
          </div>
        </div>

        <FooterCol
          title="Services"
          items={[
            ['Digital Marketing', '/services#digital-marketing'],
            ['Website Development', '/services#website-development'],
            ['Branding', '/services#branding-communication'],
            ['UI/UX Design', '/services#ui-ux'],
            ['Cybersecurity', '/cybersecurity'],
          ]}
        />
        <FooterCol
          title="Company"
          items={[
            ['About', '/about'],
            ['Cybersecurity', '/cybersecurity'],
            ['Case Studies', '/case-studies'],
            ['Blog', '/blog'],
            ['Contact', '/contact'],
          ]}
        />

        <div>
          <h4 className="font-display text-sm font-semibold">Contact Us</h4>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <li className="flex items-start gap-2">
              <MapPin size={15} className="mt-0.5 shrink-0 text-red" />
              <span>{siteConfig.addressUAE}</span>
            </li>
            <li className="flex items-start gap-2">
              <Phone size={15} className="mt-0.5 shrink-0 text-red" />
              <a href={telLink(siteConfig.phone)} className="hover:text-white">{siteConfig.phone}</a>
            </li>
            <li className="flex items-start gap-2">
              <MessageCircle size={15} className="mt-0.5 shrink-0 text-red" />
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                WhatsApp {siteConfig.whatsapp}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Mail size={15} className="mt-0.5 shrink-0 text-red" />
              <a href={`mailto:${siteConfig.email}`} className="hover:text-white">{siteConfig.email}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/60 sm:flex-row">
          <p>© {year} {siteConfig.legalName}. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <Link href="/admin" className="hover:text-white">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: [string, string][] }) {
  return (
    <div>
      <h4 className="font-display text-sm font-semibold">{title}</h4>
      <ul className="mt-4 space-y-2.5 text-sm">
        {items.map(([label, href]) => (
          <li key={href}>
            <Link href={href} className="text-white/70 transition hover:text-white">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
