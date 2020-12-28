import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Cue, Node } from "subtitle";
import { lowerBound } from "../utils/lowerBound";
import { TimeStamp } from "./TimeStamp";
import { Scrubbar } from "./Scrubbar";
import { ProcessColors } from "../theme/components/process_colors";
import { Space } from "../theme/components/space";
import { Text } from "../theme/components/text";
import { usePlayer } from "../hooks/player";

export const SubtitlePlayer = ({ subtitles }: { subtitles: Node[] }) => {
  const [current, setCurrent] = useState("");
  const player = usePlayer();

  const cues = useMemo(
    () => subtitles.filter((s) => s.type === "cue").map((s) => s.data as Cue),
    [subtitles]
  );

  useEffect(() => {
    const max = cues[cues.length - 1].end;

    const updateCurrent = (t: number) => {
      const currentCue = cues[lowerBound(cues, (v) => t < v.end)];
      setCurrent(currentCue && t >= currentCue.start ? currentCue.text : "");
    };

    return player.observe((t) => {
      updateCurrent(t);
      if (t >= max) {
        player.pause();
      }
    });
  }, [player, cues]);

  // useEffect(() => {
  //   if (running && adjustSpeed) {
  //     const jumps = jumpsRef.current;
  //     const tNow = Date.now();
  //     jumps.splice(1, 1);
  //     jumps.push([tNow, t0]);
  //     const first = jumps[0];
  //     const last = jumps[jumps.length - 1];
  //     const averageSpeed = (last[1] - first[1]) / (last[0] - first[0]);
  //     if (averageSpeed > 0) {
  //       setV(averageSpeed);
  //     }
  //   } else {
  //     jumpsRef.current = [];
  //   }
  // }, [update, t0, running, adjustSpeed]);

  const jumpToNext = useCallback(() => {
    const t = player.t;
    const currentCue =
      cues[
        Math.min(
          cues.length - 1,
          lowerBound(cues, (v) => t < v.start)
        )
      ];
    player.set(currentCue.start);
  }, [cues, player]);

  const jumpToPrevious = useCallback(() => {
    const t = player.t;
    const currentCue =
      cues[Math.max(0, lowerBound(cues, (v) => t < v.end) - 1)];
    player.set(currentCue.start);
  }, [cues, player]);

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowLeft":
          jumpToPrevious();
          break;
        case "ArrowRight":
          jumpToNext();
          break;
        case " ":
          if (player.running) {
            player.pause();
          } else {
            player.start();
          }
          break;
      }
    };

    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  }, [jumpToNext, jumpToPrevious, player]);

  return (
    <>
      <TimeStamp />
      <Space style={{ flex: 1 }} />
      <Text style={{textAlign: "center"}} fontSize="xxl">{current}</Text>
      <Space style={{ flex: 1 }} />
      <ProcessColors mode="DARKEN_BACKGROUND">
        <Scrubbar cues={cues} />
      </ProcessColors>
    </>
  );
};
