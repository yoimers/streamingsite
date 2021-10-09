import animationData from "../../public/67021-love-animation-with-particle.json";
import { Player } from "@lottiefiles/react-lottie-player";
import React, { useRef } from "react";
import { Box, IconButton } from "@chakra-ui/react";

const BackGroundButton = ({ src }: any) => {
  const ref = useRef<any>(null);
  const start = async () => {
    ref.current.setSeeker(0, true);
    ref.current.play();
  };
  return (
    <Box position="relative" w="40px" h="40px">
      <Player
        ref={ref}
        renderer="svg"
        src={src}
        autoplay={false}
        loop={false}
        onEvent={(event) => {
          if (["load", "complete"].includes(event)) {
            const totalFrames = ref.current.state.instance.totalFrames;
            ref.current.setSeeker(totalFrames, true);
          }
          if (["frame"].includes(event)) {
            const totalFrames = ref.current.state.instance.totalFrames;
            const currentFrame = ref.current.state.instance.currentFrame;
            if (totalFrames - 2 < currentFrame) {
              ref.current.pause();
            }
          }
        }}
        style={{
          height: "100px",
          width: "100px",
          position: "absolute",
          top: "-30px",
          left: "-30px",
        }}
      />
      <IconButton
        aria-label="video like"
        position="absolute"
        w="40px"
        h="40px"
        top="-0px"
        onClick={start}
        _focus={{}}
      />
    </Box>
  );
};

export const Heart = () => {
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
          onEvent={(event) => {
            if (["load", "complete"].includes(event)) {
              const totalFrames = ref.current.state.instance.totalFrames;
              ref.current.setSeeker(totalFrames, true);
            }
            if (["frame"].includes(event)) {
              const totalFrames = ref.current.state.instance.totalFrames;
              const currentFrame = ref.current.state.instance.currentFrame;
              if (totalFrames - 2 < currentFrame) {
                ref.current.pause();
              }
            }
          }}
          style={{
            height: "100px",
            width: "100px",
            position: "absolute",
            top: "-30px",
            left: "-30px",
          }}
        />
        <IconButton
          aria-label="video like"
          position="absolute"
          w="40px"
          h="40px"
          top="-0px"
          onClick={start}
          _focus={{}}
        />
      </Box>
    </>
  );
};
