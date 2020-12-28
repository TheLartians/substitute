import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Cue, Node } from "subtitle";
import { lowerBound } from "../utils/lowerBound";
import { TimeStamp } from "./time_stamp";
import { ScrubBar } from "./scrub_bar";
import { ProcessColors } from "../theme/components/process_colors";
import { Space } from "../theme/components/space";
import { Bold, Text } from "../theme/components/text";
import { usePlayer } from "../hooks/player";
import { Layout } from "../theme/components/layout";
import { TextButton } from "../theme/components/button";
import {
  MdFastForward,
  MdFastRewind,
  MdPause,
  MdPlayArrow,
  MdClose,
} from "react-icons/md";
import { CurrentSubtitle } from "./current_subtitle";
import NoSleep from "nosleep.js";
import { AiOutlineFullscreenExit, AiOutlineFullscreen } from "react-icons/ai";
import { ShiftColors } from "../theme/components/shift_colors";
import { SpeedField } from "./speed_field";
import { Box } from "../theme/components/box";
import { Content } from "../theme/components/content";

export const SubtitlePlayer = ({
  subtitles,
  close,
}: {
  subtitles: Node[];
  close: () => void;
}) => {
  const player = usePlayer();
  const [running, setRunning] = useState(player.running);
  const [speed, setSpeed] = useState(player.v);
  const [adaptive, setAdaptive] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const startTime = useRef<[number, number]>();

  const cues = useMemo(
    () => subtitles.filter((s) => s.type === "cue").map((s) => s.data as Cue),
    [subtitles]
  );

  useEffect(() => {
    const noSleep = new NoSleep();

    document.addEventListener(
      "click",
      function enableNoSleep() {
        document.removeEventListener("click", enableNoSleep, false);
        noSleep.enable();
      },
      false
    );

    return () => {
      noSleep.disable();
    };
  }, []);

  useEffect(() => {
    const max = cues[cues.length - 1].end;

    return player.observe((t) => {
      setRunning(player.running);
      setSpeed(player.v);
      if (player.running && t >= max) {
        player.pause();
      }
    });
  }, [player, cues]);

  const adaptSpeed = useCallback(() => {
    if (adaptive && running) {
      if (startTime.current) {
        const v =
          (player.t - startTime.current[1]) /
          (Date.now() - startTime.current[0]);
        if (v > 0) {
          player.set(player.t, v);
        }
      } else {
        startTime.current = [Date.now(), player.t];
      }
    } else {
      startTime.current = undefined;
    }
  }, [adaptive, running, player]);

  const resetSpeed = useCallback(() => {
    player.set(player.t, 1);
    startTime.current = undefined;
    adaptSpeed();
  }, [adaptSpeed, player]);

  useEffect(adaptSpeed, [adaptSpeed]);

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
    adaptSpeed();
  }, [cues, player, adaptSpeed]);

  const jumpToPrevious = useCallback(() => {
    const t = player.t;
    const currentCue =
      cues[Math.max(0, lowerBound(cues, (v) => t < v.end) - 1)];
    player.set(currentCue.start);
    adaptSpeed();
  }, [cues, player, adaptSpeed]);

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
    <ShiftColors background={fullScreen ? "black" : undefined}>
      <Box style={{ flex: 1 }}>
        <Content style={{ flex: 1 }}>
          <Layout
            style={{ flex: 1, minHeight: fullScreen ? "100vh" : undefined }}
          >
            {fullScreen ? (
              <TextButton
                style={{ alignSelf: "flex-end" }}
                onClick={() => setFullScreen(false)}
                fontSize="xl"
              >
                <AiOutlineFullscreenExit />
              </TextButton>
            ) : (
              <Layout
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <TextButton onClick={close} fontSize="xl">
                  <MdClose />
                </TextButton>

                <TextButton onClick={jumpToPrevious} fontSize="xl">
                  <MdFastRewind />
                </TextButton>

                <TextButton
                  onClick={() =>
                    player.running ? player.pause() : player.start()
                  }
                  fontSize="xl"
                >
                  {running ? <MdPause /> : <MdPlayArrow />}
                </TextButton>

                <TextButton onClick={jumpToNext} fontSize="xl">
                  <MdFastForward />
                </TextButton>

                <TextButton
                  onClick={() => {
                    setFullScreen(true);
                  }}
                  fontSize="xl"
                >
                  <AiOutlineFullscreen />
                </TextButton>
              </Layout>
            )}

            <ShiftColors foreground="white">
              <Layout style={{ flex: 1, justifyContent: "center" }}>
                <CurrentSubtitle cues={cues} />
              </Layout>
            </ShiftColors>

            {!fullScreen && (
              <>
                <Layout
                  verticalMargin="m"
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <TimeStamp />
                  <Layout
                    style={{ flexDirection: "row", alignItems: "center" }}
                  >
                    <Text>
                      Speed: <SpeedField speed={speed} />
                    </Text>
                    <TextButton
                      horizontalMargin="m"
                      onClick={() => setAdaptive(!adaptive)}
                      style={{
                        textDecoration: adaptive ? undefined : "line-through",
                      }}
                      fontSize="s"
                    >
                      <Bold>Adaptive</Bold>
                    </TextButton>
                    <TextButton onClick={resetSpeed} fontSize="s">
                      <Bold>Reset</Bold>
                    </TextButton>
                  </Layout>
                </Layout>

                <ProcessColors mode="DARKEN_BACKGROUND">
                  <ScrubBar cues={cues} />
                </ProcessColors>
              </>
            )}
          </Layout>
        </Content>
      </Box>
    </ShiftColors>
  );
};
