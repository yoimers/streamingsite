import { Box, Flex, Spacer, Text } from "@chakra-ui/layout";
import React from "react";
import Lottie from "react-lottie";
import animationData from "../../public/62258-404-error.json";

type InputType = {
  query: string;
};
const NoMatch = ({ query }: InputType) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <Flex mt={10} fontSize="md" flexDirection="column" h="calc(50vh)">
      <Spacer />
      <Lottie options={defaultOptions} height={100} width={200} />
      <Flex>
        <Text opacity={0.7}>キーワード</Text>
        <Text>「 {query} 」</Text>
        <Text opacity={0.7}>を含む放送はありませんでした。</Text>
      </Flex>
    </Flex>
  );
};

export default NoMatch;
