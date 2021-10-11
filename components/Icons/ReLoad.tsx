import animationData from "../../public/lf30_editor_87ub3wwv.json";
import { Player } from "@lottiefiles/react-lottie-player";
import React, { useRef } from "react";
import { Box } from "@chakra-ui/react";
import { MyIconButton } from "./MyIconButton";

const ReLoad = () => {
  const ref = useRef<any>(null);
  const start = async () => {
    ref.current.setSeeker(0, true);
    ref.current.play();
  };
  return (
    <>
      <Box position="relative" w="40px" h="40px">
        <Player
          ref={ref}
          renderer="svg"
          src={animationData}
          autoplay={false}
          loop={false}
          onEvent={(event) => {}}
          style={{
            height: "50px",
            width: "50px",
            position: "absolute",
            top: "-5px",
            left: "-5px",
          }}
        />
        <MyIconButton start={start} />
      </Box>
    </>
  );
};
export default ReLoad;
