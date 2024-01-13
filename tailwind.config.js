/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  mode: "jit",
  theme: {
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
