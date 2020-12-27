import { styled } from "./styled";
import { BaseProps, baseStyle } from "./base";

export const Layout = styled("div")<BaseProps>((props) => ({
  ...baseStyle(props),
  display: "flex",
  flexDirection: "column",
}));
