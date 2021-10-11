import animationData from "../../public/71391-stars.json";
import { Player } from "@lottiefiles/react-lottie-player";
import React from "react";
import { useSetRecoilState } from "recoil";
import { Box } from "@chakra-ui/layout";
import { MovieEffects } from "../../states/movieEffects";

const SpreadStars = () => {
  const setMovieEffects = useSetRecoilState(MovieEffects);

  return (
    <Box position="absolute" top={0} left={0}>
      <Player
        lottieRef={(instance) =>
          setMovieEffects((prev) => ({ ...prev, star: instance }))
        }
        src={animationData}
        autoplay={false}
        loop={false}
        style={{ width: "800px", height: "500px" }}
      />
    </Box>
  );
};

export default SpreadStars;
