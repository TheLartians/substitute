import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Cue, Node } from "subtitle";
import { SubtitleDropzone } from "./components/SubtitleDropzone";
import { lowerBound } from "./utils/lowerBound";
import { TimeStamp } from "./components/TimeStamp";
import { Box } from "./theme/components/box";
import { ThemeProvider } from "./hooks/theme";
import { defaultTheme } from "./theme";
import { Content } from "./theme/components/content";
import { Scrubbar } from "./components/Scrubbar";
import { ProcessColors } from "./theme/components/process_colors";

const SubtitlePlayer = ({ subtitles }: { subtitles: Node[] }) => {
  const [update, setUpdate] = useState(0);
  const [t0, setT0] = useState(0);
  const [v, setV] = useState(1);
  const [current, setCurrent] = useState("");
  const [running, setRunning] = useState(false);

  const jumpsRef = useRef([] as [number, number][]);
  const tRef = useRef(t0);

  const cues = useMemo(
    () => subtitles.filter((s) => s.type === "cue").map((s) => s.data as Cue),
    [subtitles]
  );

  const updateCurrent = useCallback(() => {
    const t = tRef.current;
    const currentCue = cues[lowerBound(cues, (v) => t < v.end)];
    setCurrent(currentCue && t >= currentCue.start ? currentCue.text : "");
  }, [cues]);

  useEffect(() => {
    if (running) {
      const tStart = Date.now();
      const interval = setInterval(() => {
        tRef.current = (Date.now() - tStart) * v + t0;
        updateCurrent();
      }, 1000 / 60);
      return () => clearInterval(interval);
    } else {
      tRef.current = t0;
      updateCurrent();
    }
  }, [cues, v, t0, update, running, updateCurrent]);

  useEffect(() => {
    if (running) {
      const jumps = jumpsRef.current;
      const tNow = Date.now();
      jumps.splice(1, 1);
      jumps.push([tNow, t0]);
      const first = jumps[0];
      const last = jumps[jumps.length - 1];
      const averageSpeed = (last[1] - first[1]) / (last[0] - first[0]);
      if (averageSpeed > 0) {
        setV(averageSpeed);
      }
    } else {
      jumpsRef.current = [];
    }
  }, [update, t0, running]);

  const jumpToNext = useCallback(() => {
    const t = tRef.current;
    const currentCue =
      cues[
        Math.min(
          cues.length - 1,
          lowerBound(cues, (v) => t < v.start)
        )
      ];
    setT0(currentCue.start);
    setUpdate(update + 1);
  }, [cues, update]);

  const jumpToPrevious = useCallback(() => {
    const t = tRef.current;
    const currentCue =
      cues[Math.max(0, lowerBound(cues, (v) => t < v.end) - 1)];
    setT0(currentCue.start);
    setUpdate(update + 1);
  }, [cues, update]);

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
          jumpsRef.current = [];
          setV(1);
          setT0(tRef.current);
          setRunning(!running);
          break;
      }
    };

    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  }, [jumpToNext, jumpToPrevious, running]);

  return (
    <>
      <TimeStamp t={tRef} /> {current}
      <ProcessColors mode="DARKEN_BACKGROUND" >
        <Scrubbar position={tRef} setPosition={t => setT0(t)} cues={cues} />
      </ProcessColors>
    </>
  );
};

function App() {
  const [subtitles, setSubtitles] = useState<Node[]>();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box style={{ minHeight: "100vh" }}>
        <Content padding="m" style={{ flex: 1 }}>
          {subtitles ? (
            <SubtitlePlayer subtitles={subtitles} />
          ) : (
            <SubtitleDropzone onLoad={setSubtitles} />
          )}
        </Content>
      </Box>
    </ThemeProvider>
  );
}

export default App;
