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
        tertiary: "#8E8C85",
        accent: {
          DEFAULT: "#3B5BFF",
          hover: "#2A4CE8",
          subtle: "rgba(59, 91, 255, 0.08)",
          cyan: "#06B6D4",
          violet: "#8B5CF6",
          emerald: "#10B981",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
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
          "var(--font-jetbrains-mono)",
          "'JetBrains Mono'",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
      },
      boxShadow: {
        xs: "0 1px 2px rgba(0, 0, 0, 0.04)",
        card: "0 1px 3px rgba(0, 0, 0, 0.03), 0 1px 2px rgba(0, 0, 0, 0.02)",
        "card-hover": "0 12px 28px -6px rgba(0, 0, 0, 0.06), 0 8px 12px -8px rgba(0, 0, 0, 0.03)",
        "glow-accent": "0 10px 30px -8px rgba(59, 91, 255, 0.35)",
        "glow-cyan": "0 10px 30px -8px rgba(6, 182, 212, 0.3)",
      },
      animation: {
        "aurora-slow": "auroraSlow 24s ease-in-out infinite",
        "aurora-reverse": "auroraReverse 28s ease-in-out infinite",
        "pulse-slow": "pulseSlow 18s ease-in-out infinite",
        "float-gentle": "floatGentle 6s ease-in-out infinite",
        marquee: "marquee 32s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        floatGentle: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};
