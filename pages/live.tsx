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

const live: NextPage = () => {
  return (
    <Layout title="Wavelet Live">
      <Box w="40%">
        <Text
          noOfLines={2}
          as="h2"
          fontWeight="semibold"
          fontSize="md"
          lineHeight="tight"
          w="100%"
        >
          aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        </Text>
      </Box>
    </Layout>
  );
};

export default live;
