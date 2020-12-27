import fs from "fs";
import { parseSync, Cue, Node } from "subtitle";

export async function* playSubtitles(subtitles: Node[], t0: number, v: number) {
  const cues = subtitles
    .filter((s) => s.type === "cue")
    .map((s) => s.data as Cue);

  const tStart = Date.now();
  let tNext = cues[0].start;

  const getT = () => (Date.now() - tStart) * v + t0;
  let current = 0;

  while (current !== cues.length) {
    while (getT() <= tNext) {
      const delay = (tNext - getT()) / (2 * v);
      await new Promise((res) => setTimeout(res, delay));
    }
    const t = getT();
    while (current !== cues.length && cues[current].end < t) {
      current += 1;
    }
    if (current === cues.length) {
      break;
    }
    const cue = cues[current];
    if (cue.start > t) {
      tNext = cue.start;
      yield [current, undefined];
    } else {
      tNext = cue.end;
      yield [current, cue];
    }
  }
}

// (async () => {
//   const subtitles = parseSync(
//     fs.readFileSync(`${__dirname}/example.srt`).toString()
//   );
//   const cues = subtitles
//     .filter((s) => s.type === "cue")
//     .map((s) => ({ type: "cue" as const, data: s.data as Cue }));

//   for await (const [index, cue] of playSubtitles(cues, cues[0].data.start, 1)) {
//     console.log(index, cue);
//   }
// })();
