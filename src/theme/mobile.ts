import { Theme } from ".";
import { defaultTheme } from "./default";

const shrinkValues = <O extends { [key: string]: number }>(
  obj: O,
  factor: number
) => {
  const copy: { [key: string]: number } = {};
  Object.keys(obj).forEach((key) => (copy[key] = obj[key] * factor));
  return copy as O;
};

export const mobileTheme: Theme = {
  ...defaultTheme,
  spacings: shrinkValues(defaultTheme.spacings, 0.8),
  elementSizes: shrinkValues(defaultTheme.elementSizes, 0.8),
  fontSizes: shrinkValues(defaultTheme.fontSizes, 0.8),
};
