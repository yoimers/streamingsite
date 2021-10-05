import { Box, Center, Flex, HStack } from "@chakra-ui/layout";
import { useBreakpointValue, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import HeadsetIcon from "@material-ui/icons/Headset";
import HomeIcon from "@material-ui/icons/Home";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import { CgMediaPodcast } from "react-icons/cg";
import Link from "next/link";
//スマホ用のフッター
const Footerbar = () => {
  const bg = useColorModeValue("brand.backgroundcolor2", "gray.800");
  const isMobile = useBreakpointValue({ base: true, md: false });
  return isMobile ? (
    <>
      <Flex
        h={10}
        bg={bg}
        width="100%"
        height="50px"
        px={5}
        alignItems="center"
        boxShadow="base"
        position="fixed"
        zIndex={9999}
        bottom="0"
        justify="space-around"
      >
        <Link href="/" passHref>
          <Center as="a" w="full" h="100%">
            <HomeIcon aria-label="Home button" fontSize="medium" />
          </Center>
        </Link>
        <Link href="/" passHref>
          <Center as="a" w="full" h="100%">
            <HeadsetIcon fontSize="medium" />
          </Center>
        </Link>
        <Link href="/" passHref>
          <Center as="a" w="full" h="100%">
            <CgMediaPodcast size="24px" />
          </Center>
        </Link>
        <Link href="/" passHref>
          <Center as="a" w="full" h="100%">
            <AccountBoxIcon fontSize="medium" />
          </Center>
        </Link>
      </Flex>
    </>
  ) : (
    <></>
  );
};

export default Footerbar;
