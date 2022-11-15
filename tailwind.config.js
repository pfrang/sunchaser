/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        phone: "480px",
        tablet: "800px",
      },
    },
  },
  plugins: [],
};
