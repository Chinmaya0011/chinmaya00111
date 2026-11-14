/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./data/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FAF9F6",
        surface: "#FFFFFF",
        "surface-muted": "#F3F2EE",
        border: "#E7E5E0",
        "border-dark": "#D5D3CC",
        primary: "#171717",
        secondary: "#666666",
        accent: {
          DEFAULT: "#365CF5",
          hover: "#2548D9",
          subtle: "rgba(54, 92, 245, 0.08)",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        serif: [
          "Newsreader",
          "Georgia",
          "Cambria",
          "'Times New Roman'",
          "serif",
        ],
        mono: [
          "'JetBrains Mono'",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
      },
    },
  },
  plugins: [],
};
