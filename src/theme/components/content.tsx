import { Layout } from "./layout";
import { styled } from "./styled";

export const Content = styled(Layout).attrs({
  verticalMargin: "m",
  horizontalMargin: "m",
})((props) => ({
  paddingLeft: "env(safe-area-inset-left)",
  paddingRight: "env(safe-area-inset-right)",
  paddingTop: "env(safe-area-inset-top)",
  paddingBottom: "env(safe-area-inset-bottom)",
}));
