import React, { useMemo, useState } from "react";
import { Node } from "subtitle";
import { ThemeProvider } from "./hooks/theme";
import { defaultTheme } from "./theme";
import { SubtitlePlayer } from "./components/subtitle_player";
import { TimerProvider, Timer } from "./hooks/timer";
import { LandingPage } from "./components/landing_page";

function App() {
  const [subtitles, setSubtitles] = useState<Node[]>();

  const player = useMemo(() => {
    return subtitles ? new Timer() : undefined;
  }, [subtitles]);

  return (
    <ThemeProvider theme={defaultTheme}>
      {subtitles ? (
        <TimerProvider value={player!}>
          <SubtitlePlayer
            close={() => setSubtitles(undefined)}
            subtitles={subtitles}
          />
        </TimerProvider>
      ) : (
        <LandingPage setSubtitles={setSubtitles} />
      )}
    </ThemeProvider>
  );
}

export default App;
