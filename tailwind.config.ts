import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#06080d",
        foreground: "#f3f4f6",
        cyber: {
          dark: "#0a0e17",
          card: "rgba(15, 23, 42, 0.65)",
          border: "rgba(56, 189, 248, 0.15)",
          cyan: "#00f0ff",
          blue: "#3b82f6",
          purple: "#a855f7",
          green: "#10b981",
          orange: "#f97316",
          red: "#ef4444",
          yellow: "#eab308",
          isolated: "#38bdf8"
        },
      },
      backgroundImage: {
        "cyber-grid": "linear-gradient(to right, rgba(56, 189, 248, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(56, 189, 248, 0.05) 1px, transparent 1px)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "cyber-glow": "radial-gradient(circle at 50% 0%, rgba(0, 240, 255, 0.15) 0%, rgba(59, 130, 246, 0.05) 50%, transparent 100%)",
      },
      animation: {
        "pulse-glow": "pulseGlow 2.5s infinite ease-in-out",
        "scanline": "scanline 8s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "ripple": "ripple 1.5s cubic-bezier(0, 0.2, 0.8, 1) infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: "0.4", filter: "drop-shadow(0 0 10px rgba(0, 240, 255, 0.4))" },
          "50%": { opacity: "0.9", filter: "drop-shadow(0 0 20px rgba(0, 240, 255, 0.8))" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        ripple: {
          "0%": { transform: "scale(0.8)", opacity: "1" },
          "100%": { transform: "scale(2.4)", opacity: "0" },
        },
      },
      boxShadow: {
        "cyber": "0 0 25px -5px rgba(0, 240, 255, 0.25)",
        "cyber-red": "0 0 25px -5px rgba(239, 68, 68, 0.35)",
        "cyber-green": "0 0 25px -5px rgba(16, 185, 129, 0.35)",
        "cyber-purple": "0 0 25px -5px rgba(168, 85, 247, 0.35)",
        "glass": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
    },
  },
  plugins: [],
};

export default config;
