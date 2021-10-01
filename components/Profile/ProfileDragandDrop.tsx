import { Box, Center, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useRecoilValue } from "recoil";
import { ImageStateType } from "../../pages/broadcast";
import { currentUserState } from "../../states/currentUser";
import Image from "next/image";

type InputType = {
  setImageState: React.Dispatch<
    React.SetStateAction<ImageStateType | null | undefined>
  >;
};

const ProfileDragandDrop = ({ setImageState }: InputType) => {
  const [file, setFile] = useState<any>({});
  const currentUser = useRecoilValue(currentUserState);
  const bg = useColorModeValue("brand.backgroundcolor1", "gray.600");

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
    <Center
      {...getRootProps()}
      mx="auto"
      w="200px"
      h="200px"
      bg={bg}
      rounded={10}
    >
      <input {...getInputProps()} />
      {file && file.preview ? (
        <Box w="100%" h="100%" rounded="10" position="relative">
          <Image
            src={file.preview}
            layout="fill"
            objectFit="cover"
            alt="プレビュー画像です"
          />
        </Box>
      ) : (
        <Center mx="auto" h="95%" px={4}>
          <Text>ドラッグ&&ドロップしてください</Text>
        </Center>
      )}
    </Center>
  );
};

export default ProfileDragandDrop;
