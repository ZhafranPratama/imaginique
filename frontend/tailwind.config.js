/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        "Manjari" : 'Manjari',
        "LeagueSpartan" : 'League Spartan'
      }
    },
  },
  plugins: [],
}

