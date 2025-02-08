import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          purple: 'var(--primary-purple)',
        },
        text: {
          primary: 'var(--primary-text)',
          secondary: 'var(--secondary-text)',
        },
        background: {
          white: 'var(--background-white)',
        },
      },
      spacing: {
        base: 'var(--spacing-base)',
        small: 'var(--spacing-small)',
      },
      borderRadius: {
        md: '4px',
      },
      fontSize: {
        base: '16px',
      },
      fontWeight: {
        normal: '400',
        semibold: '600',
      },
      transitionDuration: {
        150: '150ms',
      },
      transitionTimingFunction: {
        linear: 'linear',
      },
    },
  },
  plugins: [],
};
export default config;
