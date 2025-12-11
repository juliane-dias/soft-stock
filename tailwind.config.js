/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", /* <--- ESTA LINHA É CRUCIAL */
  ],
  theme: {
    extend: {
      colors: {
        background: '#fdfbf7',
        'pastel-mint': '#b5ead7',
        'pastel-mint-dark': '#9cdbc4',
        'pastel-purple': '#c7ceea',
        'pastel-red': '#ffb7b2',
        'pastel-yellow': '#f7d794',
        'text-dark': '#555555',
        'text-light': '#777777',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '20px',
      }
    },
  },
  plugins: [],
}