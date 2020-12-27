import { getSpacing, Spacing, Theme } from ".";

export const getCssShadow = (
  yOffset: Spacing,
  blur: Spacing,
  opacity: number,
  theme: Theme
) => {
  return `rgba(0,0,0,${opacity}) 0px ${getSpacing(theme, yOffset)} ${getSpacing(
    theme,
    blur
  )}`;
};
