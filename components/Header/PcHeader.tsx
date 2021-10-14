import React from "react";
import {
  Box,
  Center,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Spacer,
  useColorModeValue,
} from "@chakra-ui/react";
import Image from "next/image";
import { SearchIcon } from "@chakra-ui/icons";
import { Menubar } from "./Menubar";
import Link from "next/link";
import SignUpInModal from "../SignInUp/SignUpInModal";
import ModeIcon from "./ModeIcon";
import { Search } from "./Search";

const PcHeader = () => {
  const bg = useColorModeValue("brand.backgroundcolor2", "gray.800");
  return (
    <Box
      bg={bg}
      boxShadow="base"
      position="sticky"
      zIndex="sticky"
      top="0"
      height="60px"
    >
      {/* minW="1040px"  */}
      <Flex width="100vw" px={5} alignItems="center">
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
          <Search />
        </Flex>
        <Spacer />
        <HStack spacing={6}>
          <ModeIcon />
          <SignUpInModal isMd={true} />
        </HStack>
      </Flex>
    </Box>
  );
};

export default PcHeader;
