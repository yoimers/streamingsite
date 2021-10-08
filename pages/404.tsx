import animationData from "../public/62258-404-error.json";
import Lottie from "react-lottie";
import React, { useState } from "react";
import { Layout } from "../components/Layout";
import { Center, Text } from "@chakra-ui/react";
import { NextPage } from "next";

const Custom404: NextPage = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <Layout title="Wavelet 404">
      <Center w="100%" h="100vh" flexDirection="column">
        <Lottie options={defaultOptions} height={200} width={300} />
        <Text as="h3" fontSize="xl" pt={1}>
          ページが見つかりません！
        </Text>
      </Center>
    </Layout>
  );
};

export default Custom404;
