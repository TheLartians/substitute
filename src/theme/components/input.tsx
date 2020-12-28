import { styled } from "./styled";
import { Spacing } from "..";
import { Text } from "./text";
import React from "react";

export const Input = styled(Text).attrs<{ as?: string }>((props) => ({
  as: props.as ?? "input",
}))<
  {
    borderRadius?: Spacing;
    flexDirection?: "row" | "column";
  } & React.HTMLProps<HTMLInputElement>
>((props) => ({
  background: "transparent",
  border: "none",
  outlineWidth: 0,
  color: props.theme.colors.foreground,
}));
