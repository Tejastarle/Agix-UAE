import type { Config } from 'tailwindcss';

// AGIX brand system.
// Extracted from the official logo: red #EF4036, navy #262262.
const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand
        red: {
          DEFAULT: '#EF4036',
          600: '#E23127',
          700: '#C42219',
        },
        navy: {
          DEFAULT: '#262262',
          800: '#1C1A4D',
          900: '#141234',
        },
        // Neutrals
        ink: '#0E0D1F',
        paper: '#FFFFFF',
        mist: '#F5F6FA',
        line: '#E7E8F0',
        fg: '#1A1930',
        muted: '#6B6C86',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 18px 50px -24px rgba(38,34,98,0.28)',
        'card-hover': '0 30px 70px -28px rgba(38,34,98,0.40)',
        'red-glow': '0 18px 45px -14px rgba(239,64,54,0.45)',
      },
      backgroundImage: {
        'grad-brand': 'linear-gradient(120deg, #EF4036 0%, #262262 100%)',
        'grad-navy': 'linear-gradient(160deg, #262262 0%, #141234 100%)',
        'grid-navy':
          'linear-gradient(rgba(38,34,98,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(38,34,98,0.05) 1px, transparent 1px)',
        'grid-light':
          'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
      },
      keyframes: {
        floaty: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        marquee: 'marquee 30s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
