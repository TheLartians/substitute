import React, { useEffect, useMemo, useRef, useState } from "react";
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

function lowerBound<T>(arr: T[], cmpLess: (r: T) => boolean) {
  let start = 0;
  let end = arr.length;

  while (start < end) {
    let pivot = Math.floor((end + start) / 2);
    if (cmpLess(arr[pivot])) {
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

const SubtitlePlayer = ({ subtitles }: { subtitles: Node[] }) => {
  const [t0, setT0] = useState(0);
  const [v, setV] = useState(1);
  const [current, setCurrent] = useState("");
  const tRef = useRef(t0);

  const cues = useMemo(
    () => subtitles.filter((s) => s.type === "cue").map((s) => s.data as Cue),
    [subtitles]
  );

  useEffect(() => {
    const tStart = Date.now();
    const interval = setInterval(() => {
      const t = (Date.now() - tStart) * v + t0;
      tRef.current = t;
      const currentCue = cues[lowerBound(cues, (v) => t < v.end)];
      setCurrent(currentCue && t >= currentCue.start ? currentCue.text : "");
    }, 1000 / 60);
    return () => clearInterval(interval);
  }, [cues, v, t0]);

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      const t = tRef.current;
      switch (event.key) {
        case "ArrowLeft": {
          const currentCue =
            cues[Math.max(0, lowerBound(cues, (v) => t < v.start) - 2)];
          setT0(currentCue.start);
          break;
        }
        case "ArrowRight": {
          const currentCue =
            cues[
              Math.min(
                cues.length - 1,
                lowerBound(cues, (v) => t < v.start)
              )
            ];
          setT0(currentCue.start);
          break;
        }
      }
    };

    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  }, [cues]);

  return <div>{current}</div>;
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
