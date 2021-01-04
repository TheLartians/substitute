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
import { FaGithub } from "react-icons/fa";
import { TextButton } from "../theme/components/button";
import screenshot from "../images/screenshot.png";

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
          <Layout margin="l" style={{ width: "100%", alignItems: "center" }}>
            <img width={elementSizes.logo} alt="project logo" src={Logo} />
            <Text style={{ textAlign: "center" }} padding="ml" fontSize="xl">
              <Bold>Subs</Bold>titute
            </Text>
            <Text style={{ textAlign: "center" }} fontSize="ml">
              A subtitle player for the browser
            </Text>
          </Layout>
          <Layout margin="ml">
            <SubtitleDropzone onLoad={setSubtitles} />
          </Layout>
          <Text margin="m" style={{ textAlign: "center" }} fontSize="m">
            Using Substitute, you can watch subtitles from an external device,
            such as a smartphone or tablet. This is useful for the rare
            situations where you don't have control over the video source, or
            want to easily adjust subtitle timings without interrupting the
            movie.
          </Text>
          <Layout horizontalMargin="m" verticalMargin="l">
            <img
              src={screenshot}
              alt="Screenshot of a mobile device using Substitute"
              style={{
                maxWidth: elementSizes.screenshot,
                width: "100%",
                objectFit: "contain",
              }}
            />
          </Layout>
          <Layout style={{ alignItems: "center" }}>
            <Text fontSize="ml">
              <Bold>Usage</Bold>
            </Text>
            <Text verticalMargin="m">
              <ol>
                <li>
                  Select a subtitle file (e.g. from{" "}
                  <Link href="https://www.opensubtitles.org">
                    OpenSubtitles.org
                  </Link>
                  )
                </li>
                <li>
                  Use the controls to synchronize the current subtitles with the
                  movie
                </li>
                <li>
                  If necessary, adjust the speed by changing the value or
                  choosing adaptive speed to synchronize with your changes
                </li>
              </ol>
            </Text>
          </Layout>
          <TextButton as="a" href="https://github.com/thelartians/substitute">
            <FaGithub size={elementSizes.icon} />
          </TextButton>
        </Layout>
      </Content>
    </Box>
  );
};
