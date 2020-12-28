import React, { memo, useEffect, useState } from "react";
import { doubleDigits } from "../utils/doubleDigits";
import { Monospace, Text } from "../theme/components/text";
import { usePlayer } from "../hooks/player";

export const TimeStamp = memo(() => {
  const player = usePlayer();
  const [current, setCurrent] = useState(player.t);

  useEffect(() => {
    return player.observe(setCurrent);
  }, [player]);

  return (
    <Text fontSize="m">
      <Monospace>
        {doubleDigits(Math.floor(current / (1000 * 60 * 60)))}:
        {doubleDigits(Math.floor((current / (1000 * 60)) % 60))}:
        {doubleDigits(Math.floor((current / 1000) % 100))}
      </Monospace>
    </Text>
  );
});
