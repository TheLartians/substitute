import * as styledComponents from "styled-components";

import { Theme } from "../";

const {
  default: styled,
  ThemeProvider,
  useTheme,
} = (styledComponents as unknown) as styledComponents.ThemedStyledComponentsModule<Theme>;

export { styled, ThemeProvider, useTheme };
