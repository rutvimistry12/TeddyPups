import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FFF8EC",
        "light-peach": "#FFE9C9",
        "warm-yellow": "#F6D28B",
        caramel: "#D99545",
        terracotta: "#A94E20",
        chocolate: "#35190E",
        "dark-brown": "#241108",
        "soft-green": "#287B52",
        "whatsapp-green": "#25D366",
        white: "#FFFCF6",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        hand: ["var(--font-caveat)", "cursive"],
      },
      borderRadius: {
        "3xl": "1.75rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
      },
      borderWidth: {
        "3": "3px",
      },
      boxShadow: {
        scrapbook: "3px 4px 0px 0px rgba(53, 25, 14, 0.9)",
        "scrapbook-lg": "6px 8px 0px 0px rgba(53, 25, 14, 0.9)",
        "scrapbook-xl": "10px 12px 0px 0px rgba(53, 25, 14, 0.9)",
        "soft-glow": "0 10px 30px -10px rgba(217, 149, 69, 0.25)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float 7s ease-in-out 2s infinite",
        wiggle: "wiggle 2s ease-in-out infinite",
        pulseFast: "pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        bounceGentle: "bounceGentle 2s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        bounceGentle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

