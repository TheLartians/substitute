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
    <Box style={{ flex: 1 }}>
      <Content style={{ flex: 1, zIndex: 1 }}>
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
            <Text style={{ textAlign: "center" }} fontSize="ml">
              An external subtitle player for the browser
            </Text>
          </Layout>
          <SubtitleDropzone onLoad={setSubtitles} />
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
