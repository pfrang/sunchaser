/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        inherit: "inherit",
        blues: {
          200: "#004871",
          400: "#323A55",
          500: "#262C42",
          700: "#6B93AA",
          900: "#3B4566",
          1000: "#252B40",
          1100: "242A3F",
        },
        greens: {
          100: "#2C5C32",
          200: "#3a6939",
          300: "#f8fbf1",
          400: "#2C5C32",
          500: "#D5E8CE",
        },
        white: "#FFFFFF",
        black: "#000000",
        greys: {
          100: "rgba(255,250,250, 0.42)",
          200: "rgba(136, 139, 154, 0.20)",
        },
      },
      borderRadius: {
        custom: "36px 36px 0px 0px",
        inherit: "inherit",
      },
      boxShadow: {
        "custom-inner": "inset 0em 6px rgba(0, 0, 0, 0.25)",
        "custom-minor": "0px 4px 4px rgba(0, 0, 0, 0.25)",
        top: "0 -10px 10px -10px rgba(0, 0, 0, 0.1)",
      },
      screens: {
        sm: "480px",
        md: "800px",
        lg: "1024px",
        xlg: "1280px",
      },
      transitionProperty: {
        width: "width",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
