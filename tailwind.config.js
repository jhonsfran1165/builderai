const { fontFamily } = require("tailwindcss/defaultTheme")
const { toRadixVar } = require("windy-radix-palette/vars")
const colors = require("tailwindcss/colors")

const generateRadixColors = (color) => {
  return {
    DEFAULT: toRadixVar(color, 9),
    foreground: toRadixVar(color, 12),
    base: toRadixVar(color, 1),
    bgSubtle: toRadixVar(color, 2),
    bg: toRadixVar(color, 3),
    bgHover: toRadixVar(color, 4),
    bgActive: toRadixVar(color, 5),
    line: toRadixVar(color, 6),
    border: toRadixVar(color, 7),
    borderHover: toRadixVar(color, 8),
    solid: toRadixVar(color, 9),
    solidHover: toRadixVar(color, 10),
    text: toRadixVar(color, 11),
    textContrast: toRadixVar(color, 12),
  }
}

// https://tailwindcss.com/docs/theme#configuration-reference

/** @type {import('tailwindcss').Config} */
module.exports = {
  // mode: "jit", // mode just in time
  darkMode: ["class", '[data-theme="dark"]'],
  // prefix: 'builderai-', // activate to use prefixes here
  content: [
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
  ],
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
      ...colors,
      // light mode
      tremor: {
        brand: {
          faint: toRadixVar("amber", 3), // blue-50
          muted: toRadixVar("gray", 7), // blue-200
          subtle: toRadixVar("amber", 2), // blue-400
          DEFAULT: toRadixVar("amber", 9), // blue-500
          emphasis: toRadixVar("amber", 10), // blue-700
          inverted: toRadixVar("amber", 12), // white
        },
        background: {
          muted: toRadixVar("gray", 7), // gray-50
          subtle: toRadixVar("sand", 2), // gray-100
          DEFAULT: toRadixVar("sand", 1), // white
          emphasis: toRadixVar("sand", 10), // gray-700
        },
        border: {
          DEFAULT: toRadixVar("sand", 7), // gray-200
        },
        ring: {
          DEFAULT: toRadixVar("sand", 7), // gray-200
        },
        content: {
          subtle: toRadixVar("sand", 2), // gray-400
          DEFAULT: toRadixVar("sand", 11), // gray-500
          emphasis: toRadixVar("sand", 12), // gray-700
          strong: toRadixVar("sand", 9), // gray-900
          inverted: toRadixVar("sand", 12), // white
        },
      },
      // dark mode
      "dark-tremor": {
        brand: {
          faint: toRadixVar("amber", 3), // blue-50
          muted: toRadixVar("gray", 7), // blue-200
          subtle: toRadixVar("amber", 2), // blue-400
          DEFAULT: toRadixVar("amber", 9), // blue-500
          emphasis: toRadixVar("amber", 10), // blue-700
          inverted: toRadixVar("amber", 12), // white
        },
        background: {
          muted: toRadixVar("sand", 12), // gray-50
          subtle: toRadixVar("sand", 2), // gray-100
          DEFAULT: toRadixVar("sand", 3), // white
          emphasis: toRadixVar("sand", 10), // gray-700
        },
        border: {
          DEFAULT: toRadixVar("sand", 7), // gray-200
        },
        ring: {
          DEFAULT: toRadixVar("sand", 7), // gray-200
        },
        content: {
          subtle: toRadixVar("sand", 2), // gray-400
          DEFAULT: toRadixVar("sand", 11), // gray-500
          emphasis: toRadixVar("sand", 12), // gray-700
          strong: toRadixVar("sand", 9), // gray-900
          inverted: toRadixVar("sand", 12), // white
        },
      },
      gray: generateRadixColors("gray"),
      success: generateRadixColors("green"),
      danger: generateRadixColors("red"),
      warning: generateRadixColors("yellow"),
      info: generateRadixColors("blue"),
      error: generateRadixColors("red"),
      background: {
        ...generateRadixColors("sand"),
        DEFAULT: toRadixVar("sand", 2),
      },
      primary: generateRadixColors("amber"),
      secondary: generateRadixColors("crimson"),
      border: toRadixVar("sand", 7),
      input: toRadixVar("sand", 6),
      ring: toRadixVar("sand", 8),
      // background: toRadixVar("sand", 1),
      foreground: toRadixVar("sand", 11),
      destructive: {
        DEFAULT: toRadixVar("red", 9),
        foreground: toRadixVar("red", 3),
      },
      muted: {
        DEFAULT: toRadixVar("gray", 7),
        foreground: toRadixVar("gray", 11),
      },
      accent: {
        DEFAULT: toRadixVar("sand", 4),
        foreground: toRadixVar("sand", 12),
      },
      popover: {
        DEFAULT: toRadixVar("sand", 2),
        foreground: toRadixVar("sand", 11),
      },
      card: {
        DEFAULT: toRadixVar("sand", 2),
        foreground: toRadixVar("sand", 11),
      },
      transparent: "transparent",
      current: "currentColor",
      black: "#000",
      white: "#fff",
    },
    // borderColor: (theme) => ({
    //   ...theme("colors"),
    //   DEFAULT: toRadixVar("sand", 7),
    // }),
    // // Modify the default ring color so that it matches the brand color:
    // ringColor: (theme) => ({
    //   ...theme("colors"),
    //   DEFAULT: toRadixVar("sand", 9),
    // }),
    // ringOffsetColor: (theme) => ({
    //   ...theme("colors"),
    //   DEFAULT: toRadixVar("sand", 9),
    // }),
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
      boxShadow: {
        // light
        "tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "tremor-card":
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "tremor-dropdown":
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        // dark
        "dark-tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "dark-tremor-card":
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "dark-tremor-dropdown":
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      },
      borderRadius: {
        "tremor-small": "0.375rem",
        "tremor-default": "0.5rem",
        "tremor-full": "9999px",
      },
      fontSize: {
        "tremor-label": ["0.75rem"],
        "tremor-default": ["0.875rem", { lineHeight: "1.25rem" }],
        "tremor-title": ["1.125rem", { lineHeight: "1.75rem" }],
        "tremor-metric": ["1.875rem", { lineHeight: "2.25rem" }],
      },
    },
  },

  safelist: [
    {
      pattern:
        /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
  ],
  // https://www.youtube.com/watch?v=GEYkwfYytAM&ab_channel=TailwindLabs
  // tpyography is necessary later when we use contentlayer
  plugins: [
    require("@headlessui/tailwindcss"),
    require("tailwindcss-animate"),
    require("windy-radix-palette"),
    require("@tailwindcss/typography"),
    require("windy-radix-typography"),
  ],
}
