import animationData from "../../public/5756-like-5x.json";
import { Player } from "@lottiefiles/react-lottie-player";
import React, { useEffect, useRef } from "react";
import { useSetRecoilState } from "recoil";
import { spreadHeartsInstance } from "../../states/spreadhearts";
import { Box } from "@chakra-ui/layout";

const SpreadHearts = ({ ref }: any) => {
  const setSpreadHeartsInstance = useSetRecoilState(spreadHeartsInstance);

  return (
    <Box position="absolute" top={0} left={0}>
      <Player
        lottieRef={(instance) => setSpreadHeartsInstance(instance)}
        src={animationData}
        autoplay={false}
        loop={false}
        onEvent={(event) => {}}
        style={{ width: "800px", height: "500px" }}
      />
    </Box>
  );
};

export default SpreadHearts;
