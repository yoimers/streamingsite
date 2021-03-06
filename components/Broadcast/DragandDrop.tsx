import { Box, Center, Text, useColorModeValue } from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useRecoilValue } from "recoil";
import { ImageStateType } from "../../pages/broadcast";
import { currentUserState } from "../../states/currentUser";
import Image from "next/image";
import styles from "../Layout.module.css";
type InputType = {
  setImageState: React.Dispatch<
    React.SetStateAction<ImageStateType | null | undefined>
  >;
};
const DragandDrop = ({ setImageState }: InputType) => {
  const [file, setFile] = useState<any>();
  const currentUser = useRecoilValue(currentUserState);
  const bg = useColorModeValue("brand.backgroundcolor1", "gray.600");
  const bs = useColorModeValue(`0 0 0 1px #D0E3FF`, `0 0 0 1px gray.400`);

  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file: any) => {
        setFile(
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
        const reader = new FileReader();
        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");
        reader.onload = () => {
          const binaryStr = reader.result;
          if (!binaryStr || typeof binaryStr === "string") return;
          setImageState({ binaryStr, file });
        };
        reader.readAsArrayBuffer(file);
      });
    },
    [setImageState]
  );

  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: "image/*",
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, //5Mbyte
  });
  if (!currentUser) return <></>;
  return (
    <Box mt={6}>
      放送のサムネイル画像
      <Box
        {...getRootProps()}
        w={{ base: 140, md: 200 }}
        maxWidth={{ base: 140, md: 200 }}
        h={100}
        bg={bg}
        rounded={10}
      >
        <input {...getInputProps()} />
        {file && file.preview ? (
          <Box
            w={{ base: 140, md: 200 }}
            maxWidth={{ base: 140, md: 200 }}
            h={100}
            rounded="10"
            position="relative"
          >
            <Image
              src={file.preview}
              layout="fill"
              objectFit="cover"
              alt="プレビュー画像です"
              className={styles.broadimage}
            />
          </Box>
        ) : (
          <Center mx="auto" h="95%" px={4}>
            <Text>ドラッグ&&ドロップしてください</Text>
          </Center>
        )}
      </Box>
    </Box>
  );
};

export default DragandDrop;
