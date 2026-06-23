import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./types/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"],
        bebas: ["var(--font-bebas)", "sans-serif"],
        playfair: ["var(--font-playfair)", "serif"],
      },
      colors: {
        brand: {
          DEFAULT: "#2a9d8e",
          dark: "#1f7a6e",
          light: "#4ecdc4",
          bg: "#e1f5ee",
        },
        dark: {
          DEFAULT: "#071a18",
          mid: "#0f3330",
        },
      },
    },
  },
  plugins: [],
};

export default config;
