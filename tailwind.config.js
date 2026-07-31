/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-purple': '#6C4FE0',
        'primary-purple-hover': '#583CBD',
        'deep-black': '#1A1A1A',
        'charcoal': '#4A4A4A',
        'light-gray': '#E5E5E5',
        'accent-teal': '#4ECDC4',
        'origami-crimson': '#E14B4B',
        'origami-amber': '#F2A93B',
        'origami-indigo': '#4F5FE0',
        'origami-moss': '#6B9B5E',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Fraunces', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
