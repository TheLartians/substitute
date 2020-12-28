/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from "react";

export const requestAnimationInterval = (callback: () => void) => {
  let active = true;
  let id: number;
  const loop = () => {
    if (active) {
      callback();
      id = requestAnimationFrame(loop);
    }
  };
  id = requestAnimationFrame(loop);
  return () => {
    active = false;
    cancelAnimationFrame(id);
  };
};

export const useAnimationInterval = (
  callback: () => void,
  dependencies: any[] = []
) => {
  useEffect(() => requestAnimationInterval(callback), [
    callback,
    ...dependencies,
  ]);
};
