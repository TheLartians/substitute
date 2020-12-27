import { FontSize, FontWeight, Spacing } from "..";
import { BaseProps, baseStyle } from "./base";
import { styled } from "./styled";
import { getCssShadow } from "../shadow";

export const Text = styled("span")<
  {
    fontSize?: FontSize;
    fontWeight?: FontWeight;
  } & BaseProps
>((props) => [
  baseStyle(props),
  {
    fontWeight: props.theme.fontWeights[props.fontWeight ?? "normal"],
    color: props.theme.colors.foreground,
    fontSize: props.theme.fontSizes[props.fontSize ?? "m"],
  },
]);

export const ShadowedText = styled(Text)<{
  shadowOffset?: Spacing;
  shadowSpread?: Spacing;
  shadowOpacity?: number;
}>((props) => ({
  textShadow: getCssShadow(
    props.shadowOffset ?? "xs",
    props.shadowSpread ?? "xs",
    props.shadowOpacity ?? 0.5,
    props.theme
  ),
}));
