/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "../../packages/ui/**/*.{js,jsx}",
    "../../packages/filters/**/*.{js,jsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}