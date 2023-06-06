/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        phone: "480px",
        tablet: "800px",
        tabletbig: "1100px",
      },
      keyframes: {
        jumpInfinite: {
          "0%": { marginRight: "0" },
          "50%": { marginRight: "20px" },
          "100%": { marginRight: "0" },
        },
      },
    },
  },
  plugins: [require("daisyui"), require("tailwind-scrollbar")],
};
