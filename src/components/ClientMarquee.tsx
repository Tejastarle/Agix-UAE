import Image from 'next/image';
import { clients } from '@/lib/content';

// Real client logos scrolling in a marquee.
export default function ClientMarquee() {
  const row = [...clients, ...clients];
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
      <div className="flex w-max animate-marquee items-center gap-12 py-2">
        {row.map((c, i) => (
          <div key={`${c.file}-${i}`} className="relative h-14 w-32 shrink-0 opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0">
            <Image
              src={`/images/clients/${c.file}`}
              alt={c.name}
              fill
              sizes="128px"
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
