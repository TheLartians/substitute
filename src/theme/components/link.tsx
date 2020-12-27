import { styled } from "./styled";
import Color from "color";

const hoverColor = (colorCode: string) => {
  const color = Color(colorCode);
  if (color.isDark()) {
    return color.lighten(0.25).string();
  } else {
    return color.darken(0.25).string();
  }
};

const pressColor = (colorCode: string) => {
  const color = Color(colorCode);
  if (color.isDark()) {
    return color.lighten(0.5).string();
  } else {
    return color.darken(0.5).string();
  }
};

export const Link = styled("a")`
  color: ${(props) => props.theme.colors.foreground};
  text-decoration: none;
  transition: 0.5s;
  :hover {
    transition: 0.5s;
    cursor: pointer;
    color: ${(props) => hoverColor(props.theme.colors.foreground)};
    text-decoration: none;
  }
  :active {
    transition: 0s;
    color: ${(props) => pressColor(props.theme.colors.foreground)};
  }
`;
