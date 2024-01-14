/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      blues: {
        200: "#004871",
        400: "#323A55",
        500: "#262C42",
        900: "#3B4566",
      },
    },
    extend: {
      screens: {
        sm: "480px",
        md: "800px",
        lg: "1024px",
        xlg: "1280px",
      },
    },
  },
  plugins: [],
};
