import type { Metadata, Viewport } from 'next';
import './globals.css';
import { buildMetadata, organizationJsonLd, websiteJsonLd, siteConfig } from '@/lib/site';
import { introScript } from '@/lib/intro';
import SiteChrome from '@/components/chrome/SiteChrome';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  ...buildMetadata(),
  icons: { icon: '/favicon.ico', apple: '/apple-touch-icon.png' },
  manifest: '/manifest.webmanifest',
};

export const viewport: Viewport = {
  themeColor: '#262262',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://videos.pexels.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
        />
      </head>
      <body className="font-sans">
        <SiteChrome />
        {children}
      </body>
    </html>
  );
}
