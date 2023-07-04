/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./assets/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sky: {
          1000: '#110B6E',
        },
        neutral: {
          1000: '#E5E5F7',
          1200: '#F9F9FA'
        },
        mauve: {
          100: '#A8A8E0',
        },
        blue: {
          1500: '#2F2E41',
        }
      }
    },
  },
  plugins: [],
};
