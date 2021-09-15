import React from "react";
import {
  Center,
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Spacer,
  useColorMode,
} from "@chakra-ui/react";
import Image from "next/image";
import { MoonIcon, SearchIcon, SunIcon } from "@chakra-ui/icons";
import { Menubar } from "./Menubar";
import Link from "next/link";
import SignUpInModal from "../SignInUp/SignUpInModal";

export const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Flex
        width="100%"
        height="60px"
        px={5}
        alignItems="center"
        boxShadow="base"
      >
        <Flex width="full" justifyItems="center" alignItems="center">
          <Menubar />
          <Link href="/" passHref>
            <Center as="a">
              <Image src="/wavelet.svg" alt="Title" height={40} width={135} />
            </Center>
          </Link>
          <InputGroup w="260px">
            <Input
              placeholder="放送を検索！"
              borderRadius="xl"
              ml={6}
              background="brand.backgroundcolor2"
              _focus={{
                borderWidth: "2px",
                borderColor: "brand.maincolor",
              }}
            />
            <InputRightElement>
              <SearchIcon color="brand.maincolor" />
            </InputRightElement>
          </InputGroup>
        </Flex>
        <Spacer />
        <HStack spacing={6}>
          {colorMode === "light" ? (
            <IconButton
              color="brand.mygray1"
              aria-label="Change LightMode"
              rounded="full"
              _focus={{}}
              _hover={{}}
              _active={{}}
              onClick={toggleColorMode}
              icon={<MoonIcon w={6} h={6} />}
            />
          ) : (
            <IconButton
              aria-label="Change DarkMode"
              color="brand.mygray1"
              rounded="full"
              _focus={{}}
              _hover={{}}
              _active={{}}
              onClick={toggleColorMode}
              icon={<SunIcon w={6} h={6} />}
            />
          )}
          <SignUpInModal />
        </HStack>
      </Flex>
    </>
  );
};
