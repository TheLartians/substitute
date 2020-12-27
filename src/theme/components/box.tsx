import { getSpacing, Spacing } from "..";
import { Layout } from "./layout";
import { styled } from "./styled";
import { getCssShadow } from "../shadow";

export const Box = styled(Layout)<{
  borderRadius?: Spacing;
}>((props) => ({
  backgroundColor: props.theme.colors.background,
  borderRadius: getSpacing(props.theme, props.borderRadius),
  overflow: "hidden",
}));

export const ShadowedBox = styled(Box)<{
  shadowOffset?: Spacing;
  shadowSpread?: Spacing;
  shadowOpacity?: number;
}>((props) => ({
  boxShadow: getCssShadow(
    props.shadowOffset ?? "xs",
    props.shadowSpread ?? "xs",
    props.shadowOpacity ?? 0.5,
    props.theme
  ),
}));
