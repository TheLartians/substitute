import React from "react";
import Dropzone from "react-dropzone";
import { parseSync, Node } from "subtitle";
import { Layout } from "../theme/components/layout";
import { Text } from "../theme/components/text";

export const SubtitleDropzone = (props: {
  onLoad: (result: Node[]) => void;
}) => {
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
        <Layout padding="m" {...getRootProps()}>
          <input {...getInputProps()} />
          <Text>Drop subtitle here</Text>
        </Layout>
      )}
    </Dropzone>
  );
};
