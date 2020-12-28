import React, { useMemo, useState } from "react";
import { Node } from "subtitle";
import { ThemeProvider } from "./hooks/theme";
import { defaultTheme } from "./theme";
import { SubtitlePlayer } from "./components/subtitle_player";
import { PlayerProvider, Player } from "./hooks/player";
import { LandingPage } from "./components/landing_page";

function App() {
  const [subtitles, setSubtitles] = useState<Node[]>();

  const player = useMemo(() => { 
    return subtitles ? new Player() : undefined;
  }, [subtitles]);

  return (
    <ThemeProvider theme={defaultTheme}>
          {subtitles ? (
            <PlayerProvider value={player!}>
              <SubtitlePlayer
                close={() => setSubtitles(undefined)}
                subtitles={subtitles}
              />
            </PlayerProvider>
          ) : (
            <LandingPage setSubtitles={setSubtitles}/>
          )}
    </ThemeProvider>
  );
}

export default App;
