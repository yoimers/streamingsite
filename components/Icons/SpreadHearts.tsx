import animationData from "../../public/5756-like-5x.json";
import { Player } from "@lottiefiles/react-lottie-player";
import React from "react";
import { useSetRecoilState } from "recoil";
import { Box, Flex } from "@chakra-ui/layout";
import { MovieEffects } from "../../states/movieEffects";

const SpreadHearts = () => {
  const setMovieEffects = useSetRecoilState(MovieEffects);

  return (
    <Flex position="absolute" top={0} left={0} justifyContent="center">
      <Player
        lottieRef={(instance) =>
          setMovieEffects((prev) => ({ ...prev, heart: instance }))
        }
        src={animationData}
        autoplay={false}
        loop={false}
        onEvent={(event) => {}}
        style={{ width: "90%", height: "90%" }}
      />
    </Flex>
  );
};

export default SpreadHearts;
