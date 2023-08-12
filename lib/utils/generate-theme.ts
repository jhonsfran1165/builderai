import { toRadixVar } from "windy-radix-palette/vars"

const themeNames = {
  sunset: {
    muted: "gray",
    success: "green",
    destructive: "red",
    warning: "yellow",
    info: "blue",
    background: "sand",
    primary: "amber",
    secondary: "crimson",
  },
  slate: {
    muted: "gray",
    success: "teal",
    destructive: "tomato",
    warning: "amber",
    info: "cyan",
    background: "slate",
    primary: "indigo",
    secondary: "blue",
  },
}

const generateVariantRadixColors = (color) => {
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

const generateTheme = (themeName: keyof typeof themeNames) => {
  const theme = themeNames[themeName]

  return {
    transparent: "transparent",
    current: "currentColor",
    black: "#000",
    white: "#fff",
    gray: generateVariantRadixColors(theme.muted),
    success: generateVariantRadixColors(theme.success),
    danger: generateVariantRadixColors(theme.destructive),
    warning: generateVariantRadixColors(theme.warning),
    info: generateVariantRadixColors(theme.info),
    error: generateVariantRadixColors(theme.destructive),
    // shadcn variables
    background: {
      ...generateVariantRadixColors(theme.background),
      DEFAULT: toRadixVar(theme.background, 2),
    },
    primary: generateVariantRadixColors(theme.primary),
    secondary: generateVariantRadixColors(theme.secondary),
    border: toRadixVar(theme.background, 7),
    input: toRadixVar(theme.background, 6),
    ring: toRadixVar(theme.background, 8),
    foreground: toRadixVar(theme.background, 11),
    destructive: {
      DEFAULT: toRadixVar(theme.destructive, 9),
      foreground: toRadixVar(theme.destructive, 3),
    },
    muted: {
      DEFAULT: toRadixVar(theme.muted, 8),
      foreground: toRadixVar(theme.muted, 11),
    },
    accent: {
      DEFAULT: toRadixVar(theme.background, 4),
      foreground: toRadixVar(theme.background, 12),
    },
    popover: {
      DEFAULT: toRadixVar(theme.background, 2),
      foreground: toRadixVar(theme.background, 11),
    },
    card: {
      DEFAULT: toRadixVar(theme.background, 2),
      foreground: toRadixVar(theme.background, 11),
    },
  }
}

module.exports = {
  generateTheme,
}
