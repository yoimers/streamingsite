import { Center, Spinner } from "@chakra-ui/react";
import React from "react";
import { Layout } from "../Layout";

type InputType = {
  title?: string;
};
const MySpinner = ({ title }: InputType) => {
  return (
    <Layout title={`Wavelet ${title}`}>
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
