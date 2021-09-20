import { NextPage } from "next";
import React from "react";
import { Layout } from "../components/Layout";
import {
  Text,
  Container,
  HStack,
  VStack,
  GridItem,
  Box,
} from "@chakra-ui/layout";
import { Center, Flex, Square } from "@chakra-ui/react";

const live: NextPage = () => {
  return (
    <Flex color="white" p="100px" h="100%" flexDirection="column">
      <Center w="100px" bg="green.500">
        <Text>Box 1</Text>
      </Center>
      <Square bg="blue.500" size="150px">
        <Text>Box 2</Text>
      </Square>
      <Box flex="1" bg="tomato" overflowY="scroll">
        <Text>
          Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box
          3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box
          3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box
          3BoxBox 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box
          3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box
          3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box
          3BoxBox 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box
          3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box
          3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box
          3BoxBox 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box
          3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box
          3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box
          3BoxBox 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box
          3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box
          3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box
          3BoxBox 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box
          3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box
          3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box
          3BoxBox 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box
          3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box
          3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box
          3BoxBox 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box
          3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box
          3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box 3Box
          3Box 3
        </Text>
      </Box>
    </Flex>
  );
};

export default live;
