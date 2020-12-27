import { styled } from "./styled";
import { Spacing } from "..";
import { Text } from "./text";
import React from "react";
import { getCssShadow } from "../shadow";

export const Input = styled(Text).attrs<{ as?: string }>((props) => ({
  as: props.as ?? "input",
}))<
  {
    borderRadius?: Spacing;
    flexDirection?: "row" | "column";
  } & React.HTMLProps<HTMLInputElement>
>((props) => ({
  borderRadius: props.theme.spacings[props.borderRadius ?? "s"],
  backgroundColor: props.theme.colors.background,
  bosShadow: getCssShadow("xxs", "xs", 0.5, props.theme),
  color: props.theme.colors.foreground,
  borderWidth: 0,
}));
