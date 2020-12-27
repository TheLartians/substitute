import React, { RefObject, useEffect, useState } from "react";
import { doubleDigits } from "../utils/doubleDigits";

export const TimeStamp = ({ t, dt }: { t: RefObject<number>; dt?: number }) => {
  const [current, setCurrent] = useState(t.current ?? 0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent(t.current ?? 0);
    }, dt ?? 1000 / 60);
    return () => clearInterval(id);
  }, [t, dt]);

  return (
    <div style={{ fontFamily: "monospace" }}>
      {doubleDigits(Math.floor(current / (1000 * 60)))}:
      {doubleDigits(Math.floor((current / 1000) % 60))}:
      {doubleDigits(Math.floor((current / 10) % 100))}
    </div>
  );
};
