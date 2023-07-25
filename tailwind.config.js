/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xss: "320px",
      xs: "375px",
      xsm: "550px",
      ...defaultTheme.screens,
    },
    extend: {},
  },
  plugins: [],
};
