/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        /* ── Base Neutrals (§1.1) ── */
        ivory:       '#FBF7F0',
        cream:       '#F5EFE3',
        beige:       '#EDE3D0',
        tan:         '#D9C8A9',
        'warm-black':'#2A2416',
        'warm-taupe':'#6B6152',

        /* ── Division Accents (§1.1) ── */
        'sw-violet':  '#7C3AED',
        'sw-indigo':  '#4F46E5',
        'web-cyan':   '#06B6D4',
        'web-blue':   '#2563EB',
        'mk-terra':   '#C2622D',
        'mk-amber':   '#D97706',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body:    ['Inter', 'sans-serif'],
      },
      fontSize: {
        'xs':  ['0.75rem',  { lineHeight: '1rem' }],
        'sm':  ['0.875rem', { lineHeight: '1.25rem' }],
        'md':  ['1rem',     { lineHeight: '1.5rem' }],
        'lg':  ['1.125rem', { lineHeight: '1.75rem' }],
        'xl':  ['1.5rem',   { lineHeight: '2rem' }],
        '2xl': ['2rem',     { lineHeight: '2.5rem' }],
        '3xl': ['3rem',     { lineHeight: '3.5rem' }],
        '4xl': ['4rem',     { lineHeight: '4.5rem' }],
      },
      spacing: {
        '4.5': '1.125rem',
        '18':  '4.5rem',
        '22':  '5.5rem',
      },
      borderRadius: {
        'sm':  '12px',
        'md':  '20px',
        'full':'9999px',
      },
      boxShadow: {
        'card':      '0px 20px 50px -24px rgba(42, 36, 22, 0.08)',
        'card-hover':'0px 24px 56px -20px rgba(42, 36, 22, 0.14)',
        'paper':     '4px 6px 12px -2px rgba(42, 36, 22, 0.10)',
        'paper-sm':  '2px 3px 6px -1px rgba(42, 36, 22, 0.08)',
        'nav':       '0px 4px 24px -4px rgba(42, 36, 22, 0.06)',
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.4' },
        },
        'draw-line': {
          '0%':   { strokeDashoffset: '400' },
          '100%': { strokeDashoffset: '0' },
        },
      },
      animation: {
        marquee:   'marquee 42s linear infinite',
        'fade-up': 'fade-up 0.6s ease-out both',
        'pulse-dot':'pulse-dot 2s ease-in-out infinite',
        'draw-line':'draw-line 2s ease-out forwards',
      },
    },
  },
  plugins: [],
};
