import { getSpacing, Spacing } from "..";
import { styled } from "./styled";

export const Space = styled("div")<{
  width?: Spacing;
  height?: Spacing;
  maxWidth?: Spacing;
  maxHeight?: Spacing;
  flex?: number;
}>((props) => ({
  flex: props.flex,
  width: getSpacing(props.theme, props.width),
  height: getSpacing(props.theme, props.height),
  maxWidth: getSpacing(props.theme, props.maxWidth),
  maxHeight: getSpacing(props.theme, props.maxHeight),
}));
