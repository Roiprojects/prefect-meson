/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        royal: {
          50: '#F8F9FA',   // Lightest gray/white shade
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#334155',  // Medium slate
          600: '#0F172A',  // Replaces Signature Royal Blue with Stark Black/Slate-900
          700: '#020617',
          800: '#000000',
          900: '#000000',
          DEFAULT: '#0F172A',
        },
        orange: {
          50: '#F8F9FA',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#000000', // Replaces Signature Orange with pure black for accent dots
          600: '#000000',
          700: '#000000',
          DEFAULT: '#000000',
        },
      },
      fontFamily: {
        display: ['Cinzel', 'Outfit', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        editorial: ['"Cormorant Garamond"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        barlow: ['"Barlow Condensed"', 'sans-serif'],
      },
      letterSpacing: {
        'widest-arch': '0.22em',
        'mega-arch': '0.35em',
      },
      boxShadow: {
        'light-panel': '0 12px 35px -8px rgba(0, 0, 0, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.03)',
        'light-panel-scrolled': '0 16px 40px -10px rgba(0, 0, 0, 0.12), 0 6px 16px -4px rgba(0, 0, 0, 0.05)',
        'mega-light': '0 25px 60px -15px rgba(0, 0, 0, 0.1), 0 10px 25px -5px rgba(0, 0, 0, 0.06)',
        'cta-glow': '0 4px 20px -3px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
}
