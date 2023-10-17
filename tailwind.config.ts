import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "576px",
      md: "896px",
      lg: "1024px",
      xl: "1280px",
      xxl: "1440px",
      "2xl": "1920px",
    },
    extend: {
      backgroundImage: {},
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        "Player-Display": ["Playfair Display", "serif"],
      },
      colors: {
        primary: "#47177e",
        bgColor: "#F3F3FF",
        "primary-10": "#edeefb",
        "primary-20": "#dadcf7",
        "primary-30": "#c8cbf2",
        "primary-40": "#b6b9ee",
        "primary-50": "#a4a8ea",
        "primary-60": "#9197e6",
        "primary-70": "#7f85e2",
        "primary-80": "#6d74dd",
        "primary-90": "#5a62d9",
        borderColor: "#FFFFFF1A",
      },
    },
  },
  plugins: [],
};
export default config;
