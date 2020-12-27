import React, { ReactNode } from "react";

import { PaletteColor } from "..";
import { useTheme, ThemeProvider } from "../../hooks/theme";

/**
 * Swaps the foreground and background colors or replaces them with the specified values.
 */
export const ShiftColors = ({
  children,
  background,
  foreground,
}: {
  children: ReactNode;
  background?: PaletteColor;
  foreground?: PaletteColor;
}) => {
  const theme = useTheme();

  const innerTheme = {
    ...theme,
    colors: {
      ...theme.colors,
      background: background
        ? theme.palette[background]
        : theme.colors.foreground,
      foreground: foreground
        ? theme.palette[foreground]
        : theme.colors.background,
    },
  };

  return <ThemeProvider theme={innerTheme}>{children}</ThemeProvider>;
};
