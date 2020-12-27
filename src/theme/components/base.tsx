import { getSpacing, Spacing, Theme } from "..";

export interface BaseProps {
  padding?: Spacing;
  horizontalPadding?: Spacing;
  verticalPadding?: Spacing;
  margin?: Spacing;
  horizontalMargin?: Spacing;
  verticalMargin?: Spacing;
}

export const baseStyle = (props: BaseProps & { theme: Theme }) =>
  ({
    padding: getSpacing(props.theme, props.padding),
    paddingTop: getSpacing(props.theme, props.verticalPadding),
    paddingBottom: getSpacing(props.theme, props.verticalPadding),
    paddingLeft: getSpacing(props.theme, props.horizontalPadding),
    paddingRight: getSpacing(props.theme, props.horizontalPadding),
    margin: getSpacing(props.theme, props.margin),
    marginLeft: getSpacing(props.theme, props.horizontalMargin),
    marginRight: getSpacing(props.theme, props.horizontalMargin),
    marginTop: getSpacing(props.theme, props.verticalMargin),
    marginBottom: getSpacing(props.theme, props.verticalMargin),
  } as const);
