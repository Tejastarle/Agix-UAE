import type { Metadata } from 'next';

// Real AGIX details (from the company site + UAE office).
export const siteConfig = {
  name: 'AGIX',
  legalName: 'AGIX',
  title: 'AGIX — Creative, Digital & Growth Agency in the UAE',
  description:
    'AGIX is a full-service digital agency delivering digital marketing, web & e-commerce development, branding, UI/UX, VFX, video animation, media production and cyber security for brands across the UAE and beyond.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://agix.ae',
  locale: 'en_AE',
  email: 'p.kumar@agix.ae',
  phone: '+91 99878 75288',
  whatsapp: '+971 50 436 7362',
  addressUAE: 'Sharjah Media City, Sharjah, UAE',
  addressIN:
    'Office No. 606, Vindhya Commercial Premises CSL, Sector 11, CBD Belapur, Navi Mumbai, Maharashtra 400614',
  logo: '/images/logos/agix-logo.png',
  tagline: 'Exemplifying Agility and Innovation',
  keywords: [
    'digital agency UAE',
    'digital marketing Sharjah',
    'digital marketing Dubai',
    'web development UAE',
    'ecommerce development Dubai',
    'branding agency UAE',
    'UI UX design Dubai',
    'VFX studio UAE',
    'video animation Dubai',
    'cyber security UAE',
    'cybersecurity company Dubai',
    'VAPT services UAE',
    'penetration testing Dubai',
    'SOC monitoring UAE',
    'ISO 27001 consulting UAE',
    'AGIX',
    'AGIX',
  ],
  social: {
    instagram: 'https://www.instagram.com/agix.in/',
    facebook: 'https://www.facebook.com/AgixInternational/',
    linkedin: 'https://www.linkedin.com/company/agix-international-pvt-ltd/',
  },
};

type SeoInput = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  tags?: string[];
};

export function buildMetadata({
  title,
  description,
  path = '/',
  image,
  type = 'website',
  publishedTime,
  tags,
}: SeoInput = {}): Metadata {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title;
  const desc = description || siteConfig.description;
  const url = `${siteConfig.url}${path}`;
  const ogImage = image || `${siteConfig.url}/og.png`;

  return {
    title: fullTitle,
    description: desc,
    keywords: [...siteConfig.keywords, ...(tags || [])],
    alternates: { canonical: url },
    authors: [{ name: siteConfig.legalName }],
    openGraph: {
      title: fullTitle,
      description: desc,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type,
      images: [{ url: ogImage, width: 1200, height: 630, alt: fullTitle }],
      ...(publishedTime ? { publishedTime } : {}),
      ...(tags ? { tags } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: desc,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
    },
  };
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.legalName,
    alternateName: 'AGIX',
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.logo}`,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    contactPoint: [
      { '@type': 'ContactPoint', telephone: siteConfig.phone, contactType: 'sales', email: siteConfig.email },
      { '@type': 'ContactPoint', telephone: siteConfig.whatsapp, contactType: 'customer support', areaServed: 'AE' },
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Sharjah',
      addressCountry: 'AE',
    },
    sameAs: [siteConfig.social.instagram, siteConfig.social.facebook, siteConfig.social.linkedin],
    description: siteConfig.description,
  };
}

// wa.me link helper: digits only.
export const whatsappLink = (text = 'Hello AGIX, I would like to discuss a project.') =>
  `https://wa.me/${siteConfig.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`;

export const telLink = (n: string) => `tel:${n.replace(/\s/g, '')}`;

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteConfig.url}/blog?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}
