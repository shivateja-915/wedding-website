import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#c9a84c",
          light: "#e8c97a",
          dark: "#9a7a32",
          glow: "rgba(201, 168, 76, 0.35)",
        },
        dark: {
          DEFAULT: "#080808",
          2: "#0f0f0f",
          3: "#151515",
          4: "#1c1c1c",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in-up": "fadeInUp 1.2s ease forwards",
        "scroll-pulse": "scrollPulse 1.8s ease-in-out infinite",
        "frame-float": "frameFloat 4s ease-in-out infinite",
        shimmer: "shimmerAnim 2.5s ease-in-out infinite",
        "star-twinkle": "starTwinkle 3s ease-in-out infinite",
        "lantern-float": "lanternFloat 6s ease-in-out infinite",
        "counter-pop": "counterPop 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scrollPulse: {
          "0%": { top: "-100%" },
          "100%": { top: "100%" },
        },
        frameFloat: {
          "0%, 100%": { transform: "translate(0, 0) rotate(0deg)" },
          "25%": { transform: "translate(4px, -6px) rotate(0.3deg)" },
          "75%": { transform: "translate(-4px, 4px) rotate(-0.3deg)" },
        },
        shimmerAnim: {
          "0%": { left: "-100%" },
          "100%": { left: "200%" },
        },
        starTwinkle: {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "1" },
        },
        lanternFloat: {
          "0%, 100%": { transform: "translateY(0px) rotate(-2deg)" },
          "50%": { transform: "translateY(-20px) rotate(2deg)" },
        },
        counterPop: {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #c9a84c, #9a7a32)",
        "gold-radial": "radial-gradient(ellipse at center, rgba(201,168,76,0.15) 0%, transparent 70%)",
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      },
    },
  },
  plugins: [],
};

export default config;
