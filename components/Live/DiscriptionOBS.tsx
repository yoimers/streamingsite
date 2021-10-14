import {
  Flex,
  IconButton,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { FaQuestionCircle } from "react-icons/fa";
import Image from "next/image";

export const DiscriptionOBS = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <IconButton
        aria-label="Question button"
        _focus={{}}
        _active={{}}
        onClick={onOpen}
        icon={<FaQuestionCircle size="20px" color="white" />}
      />

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="slideInBottom"
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display="flex" justifyContent="center">
            配信の始め方 (OBS編)
          </ModalHeader>
          <ModalCloseButton _focus={{}} _active={{}} />
          <Flex w="100%" flexDirection="column" justifyContent="center">
            <Content header="OBSのインストール">
              OBS Studioがインストールされていない場合、
              <Link
                color="yellow.400"
                isExternal={true}
                href="https://obsproject.com/ja/download"
                textDecorationColor="yellow.400"
                textDecoration="underline"
                _focus={{}}
                _active={{}}
              >
                公式サイト
              </Link>
              からインストールしてください。
            </Content>
            <Image
              src="/downarrow.svg"
              alt="down arrow"
              width={30}
              height={30}
            />
            <Content header="配信画面の設定">
              <Flex>
                <Box w="80%">
                  OBS起動後、シーン/ソースを編集して反映したい画面を設定します
                  。
                </Box>
                <Box position="relative" w={300} h={100}>
                  <Image
                    src="/OBS1.png"
                    alt="down arrow"
                    objectFit="contain"
                    layout="fill"
                  />
                </Box>
              </Flex>
            </Content>
            <Image
              src="/downarrow.svg"
              alt="down arrow"
              width={30}
              height={30}
            />
            <Content header="仮想カメラ開始">
              <Flex>
                <Box w="80%">
                  右端にある
                  <Marker>仮想カメラ開始</Marker>
                  を押します。これで放送に画面を写す準備が出来ました。
                </Box>
                <Box position="relative" w={300} h={100}>
                  <Image
                    src="/OBS2.png"
                    alt="down arrow"
                    objectFit="contain"
                    layout="fill"
                  />
                </Box>
              </Flex>
            </Content>
            <Image
              src="/downarrow.svg"
              alt="down arrow"
              width={30}
              height={30}
            />
            <Content header="放送画面に反映する">
              <Flex>
                <Box w="100%">
                  <Marker>反映する</Marker>
                  ボタンを押します。これで視聴者の放送画面に反映されています！
                </Box>
              </Flex>
            </Content>
          </Flex>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const Content = ({ children, header }: any) => {
  const basecolor = useColorModeValue("gray.800", "gray.500");
  return (
    <Flex
      w="80%"
      mx="auto"
      rounded={8}
      border="2px"
      borderColor={basecolor}
      flexDirection="column"
      justifyContent="center"
      my={2}
    >
      <Flex
        textColor="white"
        bg={basecolor}
        p={2}
        justifyContent="center"
        alignItems="center"
        fontWeight="semibold"
      >
        {header}
      </Flex>
      <Box p={2}>{children}</Box>
    </Flex>
  );
};
const Marker = ({ children }: any) => {
  return (
    <span style={{ background: "linear-gradient(transparent 80%, #6cf 80%)" }}>
      {children}
    </span>
  );
};
