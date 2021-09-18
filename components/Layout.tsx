import {
  Box,
  Center,
  ColorModeScript,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";

import Head from "next/head";
import React, { ReactChild, ReactChildren } from "react";
import theme from "../theme";
import Header from "./Header/Header";

type Input = {
  title: string;
  children?: ReactChild | ReactChild[] | ReactChildren | ReactChildren[];
};
export const Layout = ({ title, children }: Input) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
        ></meta>
      </Head>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Box height="100vh" width="100%">
        <Header />
        <VStack height="calc(100% - 60px)" h="2000px">
          {children}
        </VStack>
      </Box>
    </>
  );
};
