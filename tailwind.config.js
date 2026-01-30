/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bar-dark': '#0a0a0a',
        'green-primary': '#22c55e',
        'green-light': '#4ade80',
        'green-dark': '#16a34a',
        'green-accent': '#10b981',
        'green-warm': '#34d399',
        'warm-amber': '#f59e0b',
        'warm-glow': '#fbbf24',
      },
      fontFamily: {
        'elegant': ['Playfair Display', 'serif'],
        'body': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

