/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#10B981', // Emerald 500
          dark: '#059669',    // Emerald 600
          light: '#34D399',   // Emerald 400
        },
        secondary: {
          DEFAULT: '#047857', // Emerald 700
          dark: '#065F46',    // Emerald 800
          light: '#059669',   // Emerald 600
        }
      },
    },
  },
  plugins: [],
};