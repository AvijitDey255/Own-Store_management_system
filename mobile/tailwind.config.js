/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        admin: {
          light: '#f3e8ff',
          badge: '#9333ea',
          bg: '#581c87',
        },
        user: {
          light: '#e0f2fe',
          badge: '#0284c7',
          bg: '#075985',
        },
        customer: {
          light: '#dcfce7',
          badge: '#16a34a',
          bg: '#166534',
        },
      },
    },
  },
  plugins: [],
};
