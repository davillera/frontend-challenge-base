/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      'white': '#F6F6F6',
      'black': '#000000',
      'yellow': '#F0B90B',
      'gray': '#1C1C1C',
      'darkgray': '#262626',
      'lightgray': '#444444'
    },
    extend: {},
  },
  plugins: [],
}