import Reveal from './Reveal';
import SplitText from './motion/SplitText';

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  invert = false,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: 'left' | 'center';
  invert?: boolean;
}) {
  return (
    <Reveal className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <SplitText
        as="h2"
        inView
        text={title}
        stagger={0.045}
        className={`mt-4 font-display text-3xl font-bold leading-tight tracking-tight sm:text-[2.6rem] ${
          invert ? 'text-white' : 'text-navy'
        }`}
      />
      {intro && (
        <p className={`mt-4 text-lg leading-8 ${invert ? 'text-white/75' : 'text-muted'}`}>{intro}</p>
      )}
    </Reveal>
  );
}
