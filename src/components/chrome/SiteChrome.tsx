'use client';

import { usePathname } from 'next/navigation';
import Preloader from './Preloader';
import SmoothScroll from './SmoothScroll';
import ScrollProgress from './ScrollProgress';
import CursorFollower from './CursorFollower';
import WhatsAppButton from './WhatsAppButton';

// Site-wide motion layer for the public site. The admin panel stays plain.
export default function SiteChrome() {
  const pathname = usePathname();
  if (pathname.startsWith('/admin')) return null;
  return (
    <>
      <Preloader />
      <SmoothScroll />
      <ScrollProgress />
      <CursorFollower />
      <WhatsAppButton />
    </>
  );
}
