import { Box } from "@chakra-ui/react";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const style = {
  width: 200,
  height: 150,
  border: "1px dotted #888",
};

const DragandDrop = () => {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    console.log("acceptedFiles:", acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    // <Box bg="tomato" w="100%" h="100%" rounded={10}>
    <div {...getRootProps()} style={style}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag drop some files here, or click to select files</p>
      )}
    </div>
    // </Box>
  );
};

export default DragandDrop;
