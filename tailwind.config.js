/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          900: "#0d6efd",
          800: "rgba(13,110,253,0.8)",
          700: "rgba(13,110,253,0.7)",
          600: "rgba(13,110,253,0.6)",
          500: "rgba(13,110,253,0.5)",
          400: "rgba(13,110,253,0.4)",
          300: "rgba(13,110,253,0.3)",
          200: "rgba(13,110,253,0.2)",
          100: "rgba(13,110,253,0.1)",
          50: "rgba(13,110,253,0.05)",
        },
        accent: {
          DEFAULT: "#0D6EFD", 
          light: "#66B2FF", 
          dark: "#0049B2", 
          50: "#E6F0FF", 
          100: "#CCE1FF",
          200: "#99C2FF",
          300: "#66A3FF",
          400: "#3385FF",
          500: "#0D6EFD",
          600: "#0C63E5",
          700: "#0A53C2",
          800: "#08429E",
          900: "#052D66",
        },
        main: "#111111",
        grey: "#FAFAFA",
        greyborder: "#B8B8B8",
        warning: "#F3BB1B",
        error: "#F13637",
        success: "#3DC13C",
      },
      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"],
        archivo: ["Archivo", "sans-serif"],
      },
      fontSize: {
        tiny: "0.75rem", // 12px
        small: "1rem", // 16px
        medium: "1.25rem", // 20px
        large: "1.5rem", // 24px
        xl: "2rem", // 32px
        "2xl": "2.5rem", // 40px
        "3xl": "3rem", // 48px
        "4xl": "3.5rem", // 56px
      },
      lineHeight: {
        100: "100%",
        110: "110%",
        120: "120%",
        140: "140%",
        150: "150%",
      },
      letterSpacing: {
        tightest: "0%",
      },
      // fontWeight: {
      //   normal: "400",
      //   medium: "500",
      //   bold: "700",
      // },
    },
    screens: {
      xs: "375px",
      ...defaultTheme.screens,
    },
  },
  plugins: [],
};
