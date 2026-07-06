/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['var(--font-inter)'],
        'hind-siliguri': ['var(--font-hind-siliguri)'],
      },
    },
  },
  plugins: [],
}

