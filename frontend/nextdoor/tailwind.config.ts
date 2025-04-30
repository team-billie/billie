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
      },
    },
  },
  //base layer와 utilities layerㅇ와 components layer를 확장하는 역할
  plugins: [forms, daisyui],
};
export default config;
