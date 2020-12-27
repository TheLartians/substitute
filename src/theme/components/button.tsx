import { styled } from "./styled";
import { Input } from "./input";
import { getCssShadow } from "../shadow";
import Color from "color";

const hoverColor = (colorCode: string) => {
  const color = Color(colorCode);
  if (color.isDark()) {
    return color.lighten(0.1).string();
  } else {
    return color.darken(0.1).string();
  }
};

const pressColor = (colorCode: string) => {
  const color = Color(colorCode);
  if (color.isDark()) {
    return color.lighten(0.25).string();
  } else {
    return color.darken(0.25).string();
  }
};

export const Button = styled(Input).attrs({ as: "button" })<
  React.HTMLProps<HTMLButtonElement> & { disabled?: boolean }
>`
  transition: 0.25s;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  pointer-events: ${(props) => (props.disabled ? "none" : "initial")};
  box-shadow: ${(props) => getCssShadow("xxs", "xs", 0.5, props.theme)};
  :hover {
    cursor: pointer;
    background-color: ${(props) => hoverColor(props.theme.colors.background)};
  }
  :active {
    transition: 0s;
    background-color: ${(props) => pressColor(props.theme.colors.background)};
  }
`;
