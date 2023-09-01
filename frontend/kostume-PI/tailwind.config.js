/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary": "#F7D1EB",
        "btn-primary": "#D46D80",
        "card": "#F8E1ED",
        "ft": "#BA828D",

      },
    },
  },
  plugins: [],
};
