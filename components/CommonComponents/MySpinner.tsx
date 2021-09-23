import { Center, Spinner } from "@chakra-ui/react";
import React from "react";
import { Layout } from "../Layout";

const MySpinner = () => {
  return (
    <Layout title="Wavelet">
      <Center w="100%" h="100vh">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Center>
    </Layout>
  );
};

export default MySpinner;
