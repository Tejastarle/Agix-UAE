import {
  Megaphone,
  Code2,
  Sparkles,
  ShoppingCart,
  PenTool,
  Clapperboard,
  Film,
  Camera,
  ShieldCheck,
  Globe,
  Smartphone,
  Cloud,
  Server,
  Crosshair,
  Cpu,
  Factory,
  BrainCircuit,
  GitBranch,
  Radar,
  Search,
  ClipboardCheck,
  type LucideProps,
} from 'lucide-react';

const map: Record<string, React.ComponentType<LucideProps>> = {
  Megaphone,
  Code2,
  Sparkles,
  ShoppingCart,
  PenTool,
  Clapperboard,
  Film,
  Camera,
  ShieldCheck,
  Globe,
  Smartphone,
  Cloud,
  Server,
  Crosshair,
  Cpu,
  Factory,
  BrainCircuit,
  GitBranch,
  Radar,
  Search,
  ClipboardCheck,
};

export default function Icon({ name, ...props }: { name: string } & LucideProps) {
  const Cmp = map[name] ?? Sparkles;
  return <Cmp {...props} />;
}
