import { palette } from "./colors";

export const defaultTheme = {
  palette,
  colors: {
    foreground: palette.white,
    background: palette.blue,
  },
  elementSizes: {
    icon: 44,
    scrubbar: 50,
    scrubCursor: 2,
    content: 1024,
  },
  spacings: {
    xxs: 1,
    xs: 2,
    s: 5,
    m: 10,
    ml: 20,
    l: 50,
    xl: 100,
    xxl: 250,
  },
  fontSizes: {
    xxs: 10,
    xs: 12,
    s: 14,
    m: 16,
    ml: 20,
    l: 24,
    xl: 32,
    xxl: 48,
  },
  fontWeights: {
    normal: "normal",
    bold: "bold",
    lighter: "lighter",
  } as const,
  breakpoints: {
    mobileM: 750,
    mobileS: 350,
  },
};
