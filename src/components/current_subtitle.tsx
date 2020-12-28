import React, { useEffect, useState } from "react";
import { Cue } from "subtitle";
import { lowerBound } from "../utils/lowerBound";
import { Text } from "../theme/components/text";
import { usePlayer } from "../hooks/player";

export const CurrentSubtitle = ({ cues }: { cues: Cue[] }) => {
  const [current, setCurrent] = useState("");
  const player = usePlayer();

  useEffect(() => {
    return player.observe((t) => {
      const currentCue = cues[lowerBound(cues, (v) => t < v.end)];
      setCurrent(currentCue && t >= currentCue.start ? currentCue.text : "");
    });
  }, [player, cues]);

  return (
    <Text style={{ textAlign: "center" }} fontSize="xxl">
      {current}
    </Text>
  );
};
