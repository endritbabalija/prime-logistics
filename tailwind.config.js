/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0056b3',
          light: '#e6f2ff',
          dark: '#004494',
        },
        secondary: {
          DEFAULT: '#4a9eff',
          light: '#c2e0ff',
          dark: '#0078d7',
        },
      },
      fontFamily: {
        urbanist: ['var(--font-urbanist)', 'Urbanist', 'sans-serif'],
        sans: ['var(--font-urbanist)', 'Urbanist', 'sans-serif'],
      },
      fontWeight: {
        thin: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },
    },
  },
  plugins: [],
}; 