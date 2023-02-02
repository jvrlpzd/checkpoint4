/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        indig: "#818CF8",
        indig2: "#6366F1",
        homered: "#C9CBF0",
        green: "#95CD31",
        yellow: "#F5AB00",
        background: "#F6F6FE",
      },
    },
  },
  plugins: [],
};
