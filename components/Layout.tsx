import { Box, ColorModeScript } from "@chakra-ui/react";
import Script from "next/script";
import Head from "next/head";
import React, { ReactChild, ReactChildren } from "react";
import useScrollbar from "../hooks/useScrollbar";
import theme from "../theme";
import Footer from "./Footer/Footer";
import Footerbar from "./Footer/Footerbar";
import Header from "./Header/Header";

type Input = {
  title: string;
  children?: ReactChild | ReactChild[] | ReactChildren | ReactChildren[];
};
export const Layout = ({ title, children }: Input) => {
  const scrollstyle = useScrollbar();
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preload" href="/api/broads" as="fetch" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
        ></meta>

      </Head>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Box height="100vh" width="100%">
        <Header />
        <Box height="calc(100% - 60px)" overflowX="scroll" css={scrollstyle}>
          {children}
        </Box>
        {/* <Footerbar /> */}
        <Footer />
      </Box>
    </>
  );
};
