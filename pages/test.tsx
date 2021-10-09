import animationData from "../public/67021-love-animation-with-particle.json";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import React, { useRef } from "react";
import { Box } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";

const Test = () => {
  const ref = useRef<any>();
  return (
    <Box w="500px" h="500px">
      <Player
        ref={ref}
        src={animationData}
        autoplay={false}
        loop={false}
        onEvent={(event) => {
          if (event === "load") ref.current.play();
        }}
      >
        <Controls
          visible={true}
          buttons={["play", "repeat", "frame", "debug"]}
        />
      </Player>
      <Button
        onClick={() => {
          console.log(ref.current);
          const totalFrames = ref.current.state.instance.totalFrames;
          ref.current.setSeeker(totalFrames, true);
          ref.current.play();
        }}
      ></Button>
    </Box>
  );
};

export default Test;
