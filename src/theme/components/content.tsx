import { Layout } from "./layout";
import { styled } from "./styled";

export const Content = styled(Layout)((props) => ({
  maxWidth: props.theme.elementSizes.content,
  margin: "auto",
  width: "100%",
  alignItems: "center",
  justifyContent: "center"
}));

export const InnerContent = styled(Layout).attrs({
  verticalMargin: "xl",
  horizontalMargin: "m",
})`
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
`;
