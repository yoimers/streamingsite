import { RepeatIcon } from "@chakra-ui/icons";
import { Box, AspectRatio, Flex } from "@chakra-ui/layout";
import {
  IconButton,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Spacer,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { Fade } from "@chakra-ui/transition";
import { isTransitionDefined } from "framer-motion/types/animation/utils/transitions";
import React, { forwardRef, useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { useHover } from "../../../hooks/useHover";
import useIsMobile from "../../../hooks/useIsMobile";
import LiveHeader from "../LiveHeader";
import { LiveInfomationType } from "../LiveType";
import VideoSlider from "./VideoSlider";

const NotMobileBackGround =
  "linear-gradient(0deg, rgba(16,18,22,0.7049194677871149) 0%, rgba(54,62,75,0.7) 20%, rgba(54,62,75,0) 30%)";
const MobileBackGround =
  "linear-gradient(0deg, rgba(16,18,22,0.7049194677871149) 0%, rgba(54,62,75,0.7) 20%, rgba(54,62,75,0) 30%, rgba(54,62,75,0) 70%, rgba(54,62,75,0.7) 80%, rgba(16,18,22,0.7) 100%)";
const CommonVideo = forwardRef(function A(
  props: LiveInfomationType,
  videoRef: any
) {
  const [ref, value] = useHover<HTMLDivElement>();
  const isMobile = useIsMobile();
  const bg = useColorModeValue("brand.backgroundcolor2", "gray.600");
  return (
    <AspectRatio ratio={16 / 9} position="relative">
      <Box
        bg={bg}
        h="calc(100% - 42px)"
        roundedTopLeft={10}
        position="relative"
        ref={ref as any}
      >
        <video
          poster={props.imageUrl}
          autoPlay
          playsInline
          ref={videoRef}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        ></video>
        <Fade in={value} transition={{ exit: { delay: 1 } }}>
          <Flex
            top="0"
            left="0"
            position="absolute"
            w="100%"
            h="100%"
            p={4}
            flexDirection="column"
            css={{
              backgroundImage: isMobile
                ? MobileBackGround
                : NotMobileBackGround,
              // "linear-gradient(0deg, rgba(74,85,104,1) 0%, rgba(74,85,104,1) 20%, rgba(255,255,255,0) 100%)",
              // "linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(40,40,40,0.788953081232493) 21%, rgba(255,255,255,0) 100%)",
            }}
          >
            {isMobile && <LiveHeader {...props} />}
            <Spacer />
            <Flex>
              <VideoSlider />
              <Spacer />
              <IconButton
                aria-label="video update"
                icon={<RepeatIcon fontSize="20px" />}
                color="white"
                bg="gray.600"
                _hover={{ bg: "gray.500" }}
                _focus={{}}
                _active={{}}
              />
            </Flex>
          </Flex>
        </Fade>
      </Box>
    </AspectRatio>
  );
});

export default CommonVideo;
