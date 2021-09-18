import React from "react";
import {
  Center,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Spacer,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import Image from "next/image";
import { SearchIcon } from "@chakra-ui/icons";
import { Menubar } from "./Menubar";
import Link from "next/link";
import SignUpInModal from "../SignInUp/SignUpInModal";
import ModeIcon from "./ModeIcon";

const PcHeader = () => {
  const bg = useColorModeValue("brand.backgroundcolor2", "gray.800");
  return (
    <>
      <Flex
        width="100%"
        height="60px"
        px={5}
        alignItems="center"
        boxShadow="base"
        bg={bg}
        position="sticky"
        zIndex="sticky"
        top="0"
      >
        <Flex width="full" justifyItems="center" alignItems="center">
          <Menubar />
          <Link href="/" passHref>
            <Center as="a" position="relative">
              <Image
                src="/iconWavelet.svg"
                alt="Title"
                height={60}
                width={180}
                layout="fixed"
              />
            </Center>
          </Link>
          <InputGroup w="100%" maxWidth="240px" justifyItems="center" mr={4}>
            <Input placeholder="放送を検索！" variant="searchinput" />
            <InputRightElement width="40px" height="40px" mr={1}>
              <SearchIcon
                color="brand.searchcolor"
                width="20px"
                height="20px"
              />
            </InputRightElement>
          </InputGroup>
        </Flex>
        <Spacer />
        <HStack spacing={6}>
          <ModeIcon />
          <SignUpInModal isMd={true} />
        </HStack>
      </Flex>
    </>
  );
};

export default PcHeader;
