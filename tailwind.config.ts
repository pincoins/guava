import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite',
        'bounce-short': 'bounce 1s ease-in-out 3', // bounce 3회 후 멈춤
      },
    },
    typography: {
      DEFAULT: {
        // this is for prose class
        css: {
          ul: { listStyleType: 'disc', listStylePosition: 'inside' },
          'li > * > li': { paddingLeft: '0.75rem' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
} satisfies Config;
