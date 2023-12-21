import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/containers/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        infiniteAnimation1: "infiniteAnimation1 10s linear infinite",
        infiniteAnimation2: "infiniteAnimation2 10s linear infinite",
        infiniteAnimation3: "infiniteAnimation3 10s linear infinite",
        infiniteAnimation4: "infiniteAnimation4 10s linear infinite",
      },
      fontSize: {
        "68": "4.25rem",
        "48": "3rem",
        "50": "3.125rem",
        "45": "2.8125rem",
        "42": "2.625rem",
        "36": "2.25rem",
        "32": "2rem",
        "30": "1.875rem",
        "28": "1.75rem",
        "24": "1.5rem",
        "22": "1.375rem",
        "20": "1.25rem",
        "18": "1.125rem",
        "16": "1rem",
        "15": "0.9375rem",
        "14": "0.875rem",
        "12": "0.75rem",
        "10": "0.625rem",
      },
      fontWeight: {
        regular: "400",
        bold: "700",
        semibold: "600",
        medium: "500",
        extrabold: "800",
      },
      colors: {
        primary: "#222222",
        white: "#ffffff",
        tertiary: "#808080",
        secondary: "#A0D1EF",
        warning: "#D7260D",
        pagenation: "#d4d4d4",
        accent: "#ff4800",
        product: "#F5F5F5",
      },
    },
  },
  plugins: [],
};
export default config;
