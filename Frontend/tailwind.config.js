/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",
        calmBg: "#F9FAFB",
        joy: "#E6FFFA",
        sadness: "#FDECEC",
        fear: "#FFF7E6",
        anger: "#FFE6E6",
        neutral: "#F3F4F6",
      },
    },
  },
  plugins: [],
};