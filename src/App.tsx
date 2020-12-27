import React, {
  Ref,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import logo from "./logo.svg";
import "./App.css";
import Dropzone from "react-dropzone";
import { parseSync, Cue, Node } from "subtitle";
import { playSubtitles } from "./play_subtitles";

const SubtitleDropzone = (props: { onLoad: (result: Node[]) => void }) => {
  const readSubtitle = (file: File) => {
    var reader = new FileReader();
    reader.onload = function (event) {
      props.onLoad(parseSync(event.target?.result as string));
    };
    reader.readAsText(file);
  };

  return (
    <Dropzone onDrop={(acceptedFiles) => readSubtitle(acceptedFiles[0])}>
      {({ getRootProps, getInputProps }) => (
        <section>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drop subtitle here</p>
          </div>
        </section>
      )}
    </Dropzone>
  );
};

function lowerBound<T>(arr: T[], condition: (r: T) => boolean) {
  let start = 0;
  let end = arr.length;

  while (start < end) {
    let pivot = Math.floor((end + start) / 2);
    if (condition(arr[pivot])) {
      end = pivot;
    } else {
      start = pivot + 1;
    }
  }

  return start;
}

const getTitle = (t: number, subtitles: Cue[]) => {
  const current = subtitles[lowerBound(subtitles, (v) => t < v.end)];
  if (current && t > current.start) {
    return current.text;
  } else {
    return "";
  }
};

const doubleDigits = (t: number) => {
  return t < 10 ? `0${t}` : t.toString();
};

const TimeStamp = ({ t, dt }: { t: RefObject<number>; dt?: number }) => {
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
    <div>
      <TimeStamp t={tRef} /> {current}
    </div>
  );
};

function App() {
  const [subtitles, setSubtitles] = useState<Node[]>();

  return (
    <div className="App">
      <header className="App-header">
        {subtitles ? (
          <SubtitlePlayer subtitles={subtitles} />
        ) : (
          <SubtitleDropzone onLoad={setSubtitles} />
        )}
      </header>
    </div>
  );
}

export default App;
