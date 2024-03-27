/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{html,js}",
    "./pages/**/*.{html,js}",
    "./index.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  variants: {
    extend: {
        display: ["group-hover"],
    }
  }
}

