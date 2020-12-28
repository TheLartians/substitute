import Color from "color";
import React, { ReactNode, useMemo } from "react";

import { Theme } from "..";
import { useTheme, ThemeProvider } from "../../hooks/theme";

const processColors = (
  { foreground, background }: Theme["colors"],
  mode:
    | "INVERT"
    | "DARKEN_BACKGROUND"
    | "LIGHTEN_BACKGROUND"
    | "NONE"
    | "MAKE_TRANSPARENT",
  strength = 1
): Theme["colors"] => {
  switch (mode) {
    case "NONE":
      return { background, foreground };
    case "INVERT":
      return { background: foreground, foreground: background };
    case "DARKEN_BACKGROUND":
      return {
        foreground,
        background: Color(background)
          .darken(0.25 * strength)
          .desaturate(0.5 * strength)
          .toString(),
      };
    case "LIGHTEN_BACKGROUND":
      return {
        foreground,
        background: Color(background)
          .lighten(0.4 * strength)
          .saturate(0.1 * strength)
          .toString(),
      };
    case "MAKE_TRANSPARENT":
      return {
        foreground: Color(foreground)
          .alpha(strength * 0.5)
          .toString(),
        background: Color(background)
          .alpha(strength * 0.5)
          .toString(),
      };
  }
};

export const ProcessColors = ({
  children,
  mode = "INVERT",
  strength = 1,
}: {
  children: ReactNode;
  mode?: Parameters<typeof processColors>[1];
  strength?: Parameters<typeof processColors>[2];
}) => {
  const theme = useTheme();

  const innerTheme = useMemo(
    () => ({
      ...theme,
      colors: processColors(theme.colors, mode, strength),
    }),
    [theme, mode, strength]
  );

  return <ThemeProvider theme={innerTheme}>{children}</ThemeProvider>;
};
