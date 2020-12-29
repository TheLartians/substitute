import React, { useEffect, useState } from "react";
import { Cue } from "subtitle";
import { lowerBound } from "../utils/lowerBound";
import { Text } from "../theme/components/text";
import { useTimer } from "../hooks/timer";

export const CurrentSubtitle = ({ cues }: { cues: Cue[] }) => {
  const [current, setCurrent] = useState("");
  const timer = useTimer();

  useEffect(() => {
    return timer.observe((t) => {
      const currentCue = cues[lowerBound(cues, (v) => t < v.end)];
      setCurrent(currentCue && t >= currentCue.start ? currentCue.text : "");
    });
  }, [timer, cues]);

  return (
    <Text style={{ textAlign: "center" }} fontSize="xxl">
      {current}
    </Text>
  );
};
