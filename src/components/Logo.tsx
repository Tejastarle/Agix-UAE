import Image from 'next/image';
import Link from 'next/link';

// Uses the official AGIX International logo mark + wordmark.
export default function Logo({
  variant = 'dark',
  className = '',
}: {
  variant?: 'dark' | 'light';
  className?: string;
}) {
  const light = variant === 'light';
  return (
    <Link href="/" aria-label="AGIX International — home" className={`flex items-center gap-2.5 ${className}`}>
      <span
        className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-colors duration-300 ${
          light ? 'bg-white shadow-[0_8px_24px_-8px_rgba(0,0,0,0.5)]' : 'bg-transparent'
        }`}
      >
        <Image
          src="/images/logos/agix-logo.png"
          alt="AGIX International logo"
          width={40}
          height={40}
          priority
          className={`object-contain ${light ? 'h-8 w-8' : 'h-9 w-9'}`}
        />
      </span>
      <span className={`font-display text-lg font-extrabold leading-none tracking-tight ${light ? 'text-white' : 'text-navy'}`}>
        AGIX
        <span className="ml-1 align-top text-[10px] font-semibold text-red">™</span>
        <span
          className={`block text-[10px] font-medium uppercase tracking-[0.18em] ${
            light ? 'text-white/70' : 'text-muted'
          }`}
        >
          International
        </span>
      </span>
    </Link>
  );
}
