/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        BlackHanSansRegular: "BlackHanSans",
        BlackOpsOneRegular: "BlackOpsOne",
        PottaOneRegular: "PottaOne",
        CrescentRegular: "CrescentRegular",
      },
      screens: {},
      backgroundImage: {
        "gradient-radial":
          "radial-gradient(ellipse at center, var(--tw-gradient-stops))",
        "gradient-radial-at-t":
          "radial-gradient(ellipse at top, var(--tw-gradient-stops))",
        "gradient-radial-at-b":
          "radial-gradient(ellipse at bottom, var(--tw-gradient-stops))",
        "gradient-radial-at-l":
          "radial-gradient(ellipse at left, var(--tw-gradient-stops))",
        "gradient-radial-at-r":
          "radial-gradient(ellipse at right, var(--tw-gradient-stops))",
        "gradient-radial-at-tl":
          "radial-gradient(ellipse at top left, var(--tw-gradient-stops))",
        "gradient-radial-at-tr":
          "radial-gradient(ellipse at top right, var(--tw-gradient-stops))",
        "gradient-radial-at-bl":
          "radial-gradient(ellipse at bottom left, var(--tw-gradient-stops))",
        "gradient-radial-at-br":
          "radial-gradient(ellipse at bottom right, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#c3e5ed",
        secondary: "#9dcadc",
        systemRed: "#ff1a1a",
        systemYellow: "#f7f9d2",
        systemPurple: "#ef9aff",
        systemBlue: "#18a6f7",
        systemGreen: "#15e91e",
        systemPink: "#e2193c",
        factorialBlue: "#0094FF",
        factorialDarkGray: "#333333",
        neutral1: "#b093a3",
        neutral2: "#787492",
        neutral3: "#282e54",
        baseBg: "#0e1c28",
        white10: "rgba(255,255,255,0.1)",
        white20: "rgba(255,255,255,0.2)",
        white30: "rgba(255,255,255,0.3)",
        white40: "rgba(255,255,255,0.4)",
        white50: "rgba(255,255,255,0.5)",
        white60: "rgba(255,255,255,0.6)",
        white70: "rgba(255,255,255,0.7)",
        white80: "rgba(255,255,255,0.8)",
        white90: "rgba(255,255,255,0.9)",
        black10: "rgba(0,0,0,0.1)",
        black20: "rgba(0,0,0,0.2)",
        black30: "rgba(0,0,0,0.3)",
        black40: "rgba(0,0,0,0.4)",
        black50: "rgba(0,0,0,0.5)",
        black60: "rgba(0,0,0,0.6)",
        black70: "rgba(0,0,0,0.7)",
        black80: "rgba(0,0,0,0.8)",
        black90: "rgba(0,0,0,0.9)",
      },
      borders: {},
      boxShadow: {},
    },
  },
  plugins: [],
};
