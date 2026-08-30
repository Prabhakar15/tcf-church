/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        tcf: {
          navy: '#0B1F3A',
          gold: '#C9A227',
          'light-bg': '#F8F7F3',
        },
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      spacing: {
        section: '3rem',
        'section-lg': '4rem',
      },
      maxWidth: {
        content: '56rem',
        'content-lg': '64rem',
      },
    },
  },
  plugins: [],
};
