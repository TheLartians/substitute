import React from "react";
import { Node } from "subtitle";
import { SubtitleDropzone } from "./subtitle_dropzone";
import { Bold, Text } from "../theme/components/text";
import { Layout } from "../theme/components/layout";
import { Link } from "../theme/components/link";
import { Box } from "../theme/components/box";
import { Content } from "../theme/components/content";
import Logo from "../images/resources/export/icon.svg";
import { useTheme } from "../hooks/theme";

export const LandingPage = ({
  setSubtitles,
}: {
  setSubtitles: (subs: Node[]) => void;
}) => {
  const { elementSizes } = useTheme();

  return (
    <Box style={{ flex: 1, alignItems: "center" }}>
      <Content style={{ flex: 1, zIndex: 1, maxWidth: elementSizes.content }}>
        <Layout
          style={{
            flex: 1,
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Layout style={{ width: "100%", alignItems: "center" }}>
            <img width={elementSizes.logo} alt="project logo" src={Logo} />
            <Text style={{ textAlign: "center" }} padding="ml" fontSize="xl">
              <Bold>Subs</Bold>titute
            </Text>
            <Text padding="ml" style={{ textAlign: "center" }} fontSize="ml">
              An external subtitle player for the browser.
            </Text>
          </Layout>
          <Text padding="m" style={{ textAlign: "center" }} fontSize="m">
            Using Substitute, you can watch subtitles from an external device,
            such as a smartphone or tablet. This is useful for the rare
            situations where you don't have control over the video source, or
            don't want to easily adjust subtitle timings without interrupting
            the movie.
          </Text>
          <Layout padding="ml">
            <SubtitleDropzone onLoad={setSubtitles} />
          </Layout>
          <Layout style={{ alignItems: "flex-start" }}>
            <Text verticalMargin="m" fontSize="ml">
              <Bold>Usage</Bold>
            </Text>
            <Text verticalMargin="xs">
              1. Select a subtitle file (e,g, from{" "}
              <Link href="https://www.opensubtitles.org">
                OpenSubtitles.org
              </Link>
              )
            </Text>
            <Text verticalMargin="xs">
              2. Use the controls to synchronize the subtitles with the movie
            </Text>
            <Text verticalMargin="xs">
              3. If necessary, adjust the speed or choose adaptive, to respond
              in real-time
            </Text>
          </Layout>
        </Layout>
      </Content>
    </Box>
  );
};
