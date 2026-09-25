// Oversized outlined type drifting across the page — a premium agency beat
// between sections. Pure CSS animation; pauses on hover.
export default function TextMarquee({
  items,
  dark = false,
  reverse = false,
}: {
  items: string[];
  dark?: boolean;
  reverse?: boolean;
}) {
  const row = [...items, ...items];
  return (
    <div
      aria-hidden
      className={`group relative overflow-hidden py-8 ${dark ? 'bg-navy-900' : 'bg-white'}`}
    >
      <div
        className={`flex w-max items-center gap-10 animate-marquee group-hover:[animation-play-state:paused] ${
          reverse ? '[animation-direction:reverse]' : ''
        }`}
        style={{ animationDuration: '45s' }}
      >
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10">
            <span
              className={`whitespace-nowrap font-display text-5xl font-extrabold uppercase tracking-tight sm:text-7xl ${
                i % 2 === 0 ? (dark ? 'text-outline-light' : 'text-outline') : dark ? 'text-white' : 'text-navy'
              }`}
            >
              {t}
            </span>
            <span className="h-3 w-3 rotate-45 bg-red" />
          </span>
        ))}
      </div>
    </div>
  );
}
