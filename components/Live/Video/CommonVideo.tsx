import { Box, AspectRatio, Flex } from "@chakra-ui/layout";
import { Spacer, useColorModeValue } from "@chakra-ui/react";
import { Fade } from "@chakra-ui/transition";
import React, { forwardRef } from "react";
import { useHover } from "../../../hooks/useHover";
import useIsMobile from "../../../hooks/useIsMobile";
import { Heart } from "../../Icons/Heart";
import LiveHeader from "../LiveHeader";
import { LiveInfomationType } from "../LiveType";
import ReLoad from "../../Icons/ReLoad";
import VideoSlider from "./VideoSlider";
import SpreadHearts from "../../Icons/SpreadHearts";
import { Star } from "../../Icons/Star";
import SpreadStars from "../../Icons/SpreadStars";
import { EffectIcons } from "../../Icons/EffectIcons";

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
        />
        <SpreadStars />
        <SpreadHearts />
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
            }}
          >
            {isMobile && <LiveHeader color="white" {...props} />}
            <Spacer />
            <Flex>
              <VideoSlider />
              <Spacer />
              <EffectIcons />

            </Flex>
          </Flex>
        </Fade>
      </Box>
    </AspectRatio>
  );
});

const NotMobileBackGround =
  "linear-gradient(0deg, rgba(16,18,22,0.7049194677871149) 0%, rgba(54,62,75,0.7) 20%, rgba(54,62,75,0) 30%)";
const MobileBackGround =
  "linear-gradient(0deg, rgba(16,18,22,0.7049194677871149) 0%, rgba(54,62,75,0.7) 20%, rgba(54,62,75,0) 30%, rgba(54,62,75,0) 70%, rgba(54,62,75,0.7) 80%, rgba(16,18,22,0.7) 100%)";
export default CommonVideo;
