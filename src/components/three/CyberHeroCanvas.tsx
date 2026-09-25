'use client';

import dynamic from 'next/dynamic';

// Client-only loader so the WebGL globe never runs during server rendering.
const CyberGlobe = dynamic(() => import('./CyberGlobe'), { ssr: false });

export default function CyberHeroCanvas() {
  return <CyberGlobe />;
}
