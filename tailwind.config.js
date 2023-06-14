/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {},
    screens: {
      xs: "375px",
      ...defaultTheme.screens,
    },
  },
  plugins: [],
};