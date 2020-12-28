import React, { useState } from "react";
import { parseSync, Node } from "subtitle";
import { Layout } from "../theme/components/layout";
import { ProcessColors } from "../theme/components/process_colors";
import { Bold, Text } from "../theme/components/text";
import { useDropzone } from "react-dropzone";
import { ShiftColors } from "../theme/components/shift_colors";
import { Button } from "../theme/components/button";

export const SubtitleDropzone = (props: {
  onLoad: (result: Node[]) => void;
}) => {
  const [error, setError] = useState<string>();

  const onDrop = (files: File[]) => {
    setError(undefined);
    var reader = new FileReader();
    reader.onload = function (event) {
      try {
        props.onLoad(parseSync(event.target?.result as string));
      } catch (error) {
        setError(String(error));
      }
    };
    reader.readAsText(files[0]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Layout style={{ alignItems: "center" }}>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <ProcessColors
          mode={isDragActive ? "INVERT" : "LIGHTEN_BACKGROUND"}
          strength={5}
        >
          <Button padding="ml">
            <Text>
              <Bold>Drop or select subtitle here</Bold>
            </Text>
          </Button>
        </ProcessColors>
      </div>
      <ShiftColors foreground="red">
        <Text margin="m">{error}</Text>
      </ShiftColors>
    </Layout>
  );
};
