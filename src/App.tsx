import React, { useMemo, useState } from "react";
import { Node } from "subtitle";
import { ThemeProvider } from "./hooks/theme";
import { SubtitlePlayer } from "./components/subtitle_player";
import { TimerProvider, Timer } from "./hooks/timer";
import { LandingPage } from "./components/landing_page";
import useLocalStorage from "use-local-storage";
import { darkTheme, lightTheme } from "./theme/default";

function App() {
  const [subtitles, setSubtitles] = useState<Node[]>();
  const [selectedTheme, setSelectedTheme] = useLocalStorage<"light" | "dark">(
    "selected-theme",
    "dark"
  );
  const theme = selectedTheme === "light" ? lightTheme : darkTheme;

  // use a new timer instance for every subtitle file
  const timer = useMemo(() => {
    return subtitles ? new Timer() : undefined;
  }, [subtitles]);

  return (
    <ThemeProvider theme={theme}>
      {subtitles ? (
        <TimerProvider value={timer!}>
          <SubtitlePlayer
            close={() => setSubtitles(undefined)}
            subtitles={subtitles}
          />
        </TimerProvider>
      ) : (
        <LandingPage setTheme={setSelectedTheme} setSubtitles={setSubtitles} />
      )}
    </ThemeProvider>
  );
}

export default App;
