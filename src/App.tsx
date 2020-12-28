import React, {
  useState,
} from "react";
import { Node } from "subtitle";
import { SubtitleDropzone } from "./components/SubtitleDropzone";
import { Box } from "./theme/components/box";
import { ThemeProvider } from "./hooks/theme";
import { defaultTheme } from "./theme";
import { Content } from "./theme/components/content";
import { SubtitlePlayer } from "./components/SubtitlePlayer";

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
