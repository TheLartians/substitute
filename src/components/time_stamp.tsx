import React, { memo, useEffect, useState } from "react";
import { doubleDigits } from "../utils/doubleDigits";
import { Monospace, Text } from "../theme/components/text";
import { useTimer } from "../hooks/timer";

export const TimeStamp = memo(() => {
  const timer = useTimer();
  const [seconds, setSeconds] = useState(timer.t);

  useEffect(() => {
    return timer.observe((t) => setSeconds(Math.floor(t / 1000)));
  }, [timer]);

  return (
    <Text fontSize="m">
      <Monospace>
        {doubleDigits(Math.floor(seconds / (60 * 60)))}:
        {doubleDigits(Math.floor((seconds / 60) % 60))}:
        {doubleDigits(Math.floor(seconds % 60))}
      </Monospace>
    </Text>
  );
});
