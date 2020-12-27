import { defaultTheme } from "./default";

export type Theme = typeof defaultTheme;

export type Spacing = keyof Theme["spacings"];
export type FontSize = keyof Theme["fontSizes"];
export type FontWeight = keyof Theme["fontWeights"];
export type Color = keyof Theme["colors"];
export type PaletteColor = keyof Theme["palette"];

export { defaultTheme };

export const getSpacing = (theme: Theme, spacing?: Spacing) =>
  spacing && `${theme.spacings[spacing]}px`;

export const getFontSize = (theme: Theme, fontSize?: FontSize) =>
  fontSize && theme.fontSizes[fontSize];
