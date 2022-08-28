/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "OpenSans" : 'Open Sans, sans-serif',
      },
      
    },
  },
  plugins: [],
}
