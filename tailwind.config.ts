import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#1B4332",
          deep: "#0F2D22",
          moss: "#2D6A4F",
          cream: "#FAF7F0",
          sand: "#F1EADB",
          gold: "#C9A961",
          goldlight: "#E5C97A",
          ink: "#0B1F17",
        },
      },
      fontFamily: {
        sans: ['"Vazirmatn"', "system-ui", "sans-serif"],
        display: ['"Vazirmatn"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 40px -10px rgba(27,67,50,0.25)",
        glow: "0 0 0 1px rgba(201,169,97,0.4), 0 20px 60px -20px rgba(201,169,97,0.45)",
        "glow-gold": "0 0 0 1px rgba(201,169,97,0.5), 0 20px 50px -15px rgba(201,169,97,0.6)",
      },
      backgroundImage: {
        "radial-fade": "radial-gradient(ellipse at top, rgba(45,106,79,0.25), transparent 60%)",
      },
      keyframes: {
        "bounce-in": {
          "0%": { transform: "scale(0) rotate(-180deg)", opacity: "0" },
          "60%": { transform: "scale(1.15) rotate(10deg)", opacity: "1" },
          "100%": { transform: "scale(1) rotate(0)", opacity: "1" },
        },
        "float": {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "bounce-in": "bounce-in 0.7s cubic-bezier(.34,1.56,.64,1) forwards",
        "float": "float 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
