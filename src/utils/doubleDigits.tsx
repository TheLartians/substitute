export const doubleDigits = (t: number) => {
  return Math.abs(t) < 10 ? `0${t}` : t.toString();
};
