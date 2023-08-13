const { fontFamily } = require("tailwindcss/defaultTheme")
const { generateTheme } = require("./lib/utils/generate-theme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  // mode: "jit", // mode just in time
  darkMode: ["class"],
  // prefix: 'builderai-', // activate to use prefixes here
  content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
  // disble hover on mobiles
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    screens: {
      sm: "640px", // mobile phones
      md: "768px", // tablets
      lg: "1024px", // desktops
      xl: "1280px", // large screens
      "2xl": "1536px", // extra large screens
    },
    colors: {
      ...generateTheme("sunset"),
    },
    fontSize: {
      xs: ".75rem",
      sm: ".875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
    },
    letterSpacing: {
      tight: "-0.015em",
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        satoshi: ["var(--font-satoshi)", ...fontFamily.sans],
        inter: ["var(--font-inter)", ...fontFamily.sans],
      },
      backgroundImage: {
        "gradient-conic":
          "conic-gradient(var(--conic-position), var(--tw-gradient-stops))",
        "gradient-radial-top":
          "radial-gradient(100% 60% at 100% 0%, var(--tw-gradient-stops))",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  // https://www.youtube.com/watch?v=GEYkwfYytAM&ab_channel=TailwindLabs
  // tpyography is necessary later when we use contentlayer
  plugins: [
    require("tailwindcss-animate"),
    require("windy-radix-palette"),
    require("@tailwindcss/typography"),
    require("windy-radix-typography"),
  ],
}
