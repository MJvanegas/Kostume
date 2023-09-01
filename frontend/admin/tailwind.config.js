/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#F7D1EB",
          200: "#BA828D",
          300: "#D28099",
          400: "#D46D80",
          500: "#C6C2DE",
          600: "#D4819B",
          700: "#D4819C",
        },
        secondary: {
          100: "#F4F2FF",
          200: "#6E6893",
          300: "#8B83BA",
          400: "#25213B",
          500: "#121212",
          600: "#374151",
        },
        card: "#F8E1ED",
        ft: "#BA828D",
      },
    },
  },
  plugins: [],
};
