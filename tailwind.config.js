/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFBF7',
          100: '#FAF6F0',
          200: '#F3ECE1',
          300: '#E8DCCB',
        },
        amber: {
          accent: '#E5A93B',
          hover: '#C68B29',
        },
        charcoal: {
          900: '#1A1A1A',
          800: '#2A2A2A',
          700: '#3A3A3A',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};