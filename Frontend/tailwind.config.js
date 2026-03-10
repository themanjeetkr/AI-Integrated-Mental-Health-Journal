/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",
        primaryHover: "#4338CA",

        calmBg: "#E6F0FF",

        joy: "#E6FFFA",
        sadness: "#FEE2E2",
        fear: "#FFF7E6",
        anger: "#FECACA",
        neutral: "#E5E7EB",

        textPrimary: "#111827",
        textSecondary: "#6B7280",
      },

      boxShadow: {
        card: "0 4px 14px rgba(0,0,0,0.08)",
      },

      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
    },
  },
  plugins: [],
};