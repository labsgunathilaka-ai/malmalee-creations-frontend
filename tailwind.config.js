/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkPurple: '#3d005b',
        primaryPurple: '#660099',
        lightBeige: '#eae0cc',
        softLilac: '#d1b2e0',
      }
    },
  },
  plugins: [],
}