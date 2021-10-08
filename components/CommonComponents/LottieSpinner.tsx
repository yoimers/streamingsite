import animationData from "../../public/75839-jump-through-4-hoops.json";
import Lottie from "react-lottie";
import React, { useState } from "react";
import { Layout } from "../Layout";
import { Center, Text } from "@chakra-ui/react";

type InputType = {
  title?: string;
  message?: string;
  isLayout?: boolean;
};
const LottieSpinner = ({ title, message, isLayout }: InputType) => {
  const [isStopped, setIsStopped] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <Layout title={`Wavelet ${title}`}>
      <Center w="100%" h="100vh" flexDirection="column">
        <button onClick={() => setIsStopped((prev) => !prev)}>stop</button>
        <button onClick={() => setIsPaused((prev) => !prev)}>pause</button>
        <Lottie
          options={defaultOptions}
          height={200}
          width={200}
          isStopped={isStopped}
          isPaused={isPaused}
        />
        {message && (
          <Text as="h3" fontSize="xl" pt={1}>
            {message}
          </Text>
        )}
      </Center>
    </Layout>
  );
};

export default LottieSpinner;
