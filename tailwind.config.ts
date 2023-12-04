import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
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
      },
    },
  },
  plugins: [],
};
export default config;
