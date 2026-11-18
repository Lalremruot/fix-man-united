/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "mu-red": "#DA291C",
        "mu-black": "#101010",
        "mu-dark": "#1a1a1a",
        pl: {
          purple: "#37003c",
          champions: "#0a1fd4",
          europa: "#00a67c",
          relegation: "#e0115f",
        },
      },
      fontFamily: {
        display: ['"Roboto Condensed"', "system-ui", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      gridTemplateColumns: {
        "table-row": "1.75rem minmax(0,1fr) 3rem 3.25rem",
      },
    },
  },
  plugins: [],
};