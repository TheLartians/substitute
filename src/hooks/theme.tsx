import { createContext, ReactNode, useContext } from "react";
import { defaultTheme, Theme } from "../theme";
import { ThemeProvider as RegularThemeProvider } from "../theme/components/styled";
export { useTheme } from "../theme/components/styled";

const GlobalThemeContext = createContext<Theme>(defaultTheme);

export const useGlobalTheme = () => useContext(GlobalThemeContext);

export const ThemeProvider = ({
  children,
  theme,
}: {
  children: ReactNode;
  theme: Theme;
}) => {
  return (
    <GlobalThemeContext.Provider value={theme}>
      <RegularThemeProvider theme={theme}>{children}</RegularThemeProvider>
    </GlobalThemeContext.Provider>
  );
};
