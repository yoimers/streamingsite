import { Center, Spinner, Text } from "@chakra-ui/react";
import React from "react";
import { Layout } from "../Layout";

type InputType = {
  title?: string;
  message?: string;
};
const MySpinner = ({ title, message }: InputType) => {
  return (
    <Layout title={`Wavelet ${title}`}>
      <Center w="100%" h="100vh" flexDirection="column">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
        <Text as="h3" fontSize="xl" pt={1}>
          {message}
        </Text>
      </Center>
    </Layout>
  );
};

export default MySpinner;
