/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "#eb5757",
        "secondary-color": "#4f4f4f",
        dark: "#333333",
        gray: "#828282",
      },
    },
  },
  plugins: [],
};
