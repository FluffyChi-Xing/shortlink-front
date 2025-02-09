/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'theme-dark': '#E6E6E6',
        'theme-light': '#C6E2FF',
        'theme-color': '#409EFF',
        'background-color': '#EEF0F5'
      }
    },
  },
  plugins: [],
}
