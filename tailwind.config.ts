import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--bg-start)",
        accent: "var(--accent)",
        purple: "var(--purple)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  safelist: [
    // Health text colors
    "text-green-400",
    "text-amber-400",
    "text-red-400",
    // Health background/border combos
    "bg-green-500/20",
    "border-green-500/50",
    "bg-amber-500/20",
    "border-amber-500/50",
    "bg-red-500/20",
    "border-red-500/50",
  ],
  plugins: [],
};
export default config;

