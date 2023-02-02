/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"],
  theme: {
    extend: {
      colors: {
        primary: "#212936",
        secondary: "#2B3648",
        tertiary: "#1976D2",
        tPrimary: "#FFF",
        tSecondary: "#AFBDD1",
      },
    },
  },
  plugins: [require("prettier-plugin-tailwindcss")],
};
