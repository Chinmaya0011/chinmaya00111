/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./data/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#080B0E",
        surface: "#0E141B",
        "surface-raised": "#141D26",
        "surface-card": "#0F1720",
        border: "#1C2A38",
        "border-subtle": "#15202B",
        primary: {
          50: "#ECFDF5",
          100: "#D1FAE5",
          200: "#A7F3D0",
          300: "#6EE7B7",
          400: "#34D399",
          500: "#10B981", // Emerald accent
          600: "#059669",
          700: "#047857",
        },
        slate: {
          850: "#111827",
          950: "#030712",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};

