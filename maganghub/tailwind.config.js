/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // penting untuk toggle manual via .dark
  content: [
    "./src/**/*.{js,ts,jsx,tsx,astro}",
    "./components/**/*.{js,ts,jsx,tsx,astro}",
    "./pages/**/*.{js,ts,jsx,tsx,astro}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
