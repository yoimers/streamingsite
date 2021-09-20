import React from "react";
import {
  Center,
  Flex,
  HStack,
  Spacer,
  useColorModeValue,
} from "@chakra-ui/react";
import Image from "next/image";
import { Menubar } from "./Menubar";
import Link from "next/link";
import SignUpInModal from "../SignInUp/SignUpInModal";
import MobileSearch from "./MobileSearch";

const MobileHeader = () => {
  const bg = useColorModeValue("brand.backgroundcolor2", "gray.800");
  return (
    <Flex
      width="full"
      height="60px"
      alignItems="center"
      bg={bg}
      boxShadow="base"
      position="sticky"
      zIndex="sticky"
      top="0"
    >
      <Flex width="full" p={2}>
        <Menubar />
        <Link href="/" passHref>
          <Center as="a">
            <Image src="/wavelet.svg" alt="Title" height={40} width={120} />
          </Center>
        </Link>
      </Flex>
      <Spacer />
      <HStack spacing={6} p={2}>
        <MobileSearch />
        <SignUpInModal isMd={false} />
      </HStack>
    </Flex>
  );
};

export default MobileHeader;
