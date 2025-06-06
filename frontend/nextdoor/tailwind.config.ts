import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";
import daisyui from "daisyui";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        red100: "#FA9A8A",
        yellow100: "#F4FA64",
        purple: "#A8CCFF",
        blue100: "#ECF6FE",
        blue200: "#A8CCFF",
        blue300: "#66A3FF",
        blue400: "#0074FF",
        gray100: "#F9F9FA",
        gray200: "#EBF0F5",
        gray300: "#E3EBF2",
        gray400: "#D0D8E0",
        gray500: "#B5BDC7",
        gray600: "#96A2AE",
        gray700: "#687888",
        gray800: "#3F4854",
        gray900: "#101219",
        transparentWhite10: "rgba(255, 255, 255, 0.1)",
        btncolor: "#ECF6FE",
      },
      backgroundImage: {
        bluegradient: "linear-gradient(to right,#66A3FF,#A8CCFF)",
        bluegradient2: "linear-gradient(to right,#66A3FF,#0074FF)",
        graygradient: "linear-gradient(to bottom right,#120B1B, #162940)",
      },
      boxShadow: {
        popup:
          "-1px -1px 10px rgba(255, 255, 255, 0.3), 1px 1px 10px rgba(0, 0, 0, 0.2)",
      },
    },
  },
  //base layer와 utilities layerㅇ와 components layer를 확장하는 역할
  plugins: [forms, daisyui],
};
export default config;
