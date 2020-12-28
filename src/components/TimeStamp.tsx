import React, { memo, useEffect, useState } from "react";
import { doubleDigits } from "../utils/doubleDigits";
import { Text } from "../theme/components/text";
import { usePlayer } from "../hooks/player";

export const TimeStamp = memo(() => {
  const player = usePlayer();
  const [current, setCurrent] = useState(player.t);

  useEffect(() => {
    return player.observe(setCurrent);
  }, [player]);

  return (
    <Text style={{ fontFamily: "monospace" }}>
      {doubleDigits(Math.floor(current / (1000 * 60)))}:
      {doubleDigits(Math.floor((current / 1000) % 60))}:
      {doubleDigits(Math.floor((current / 10) % 100))}
    </Text>
  );
});
