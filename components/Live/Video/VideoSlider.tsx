import {
  Box,
  Flex,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { MdGraphicEq } from "react-icons/md";
import {
  ImVolumeHigh,
  ImVolumeMedium,
  ImVolumeLow,
  ImVolumeMute,
  ImVolumeMute2,
} from "react-icons/im";
import { IconType } from "react-icons";

const VideoSlider = () => {
  const [volume, setVolume] = useState(60);
  const [isMute, setIsMute] = useState(false);
  let icon;
  const mute = () => setIsMute((prev) => !prev);
  if (isMute) {
    icon = <ImVolumeMute2 size="24px" onClick={mute} color="white" />;
  } else {
    if (0 <= volume && volume <= 10) {
      icon = <ImVolumeMute size="24px" onClick={mute} color="white" />;
    } else if (10 < volume && volume <= 30) {
      icon = <ImVolumeLow size="24px" onClick={mute} color="white" />;
    } else if (30 < volume && volume <= 60) {
      icon = <ImVolumeMedium size="24px" onClick={mute} color="white" />;
    } else if (60 < volume && volume <= 100) {
      icon = <ImVolumeHigh size="24px" onClick={mute} color="white" />;
    }
  }
  return (
    <Flex flexDirection="row" alignItems="center" position="relative">
      {icon}
      <Slider
        aria-label="slider-ex-4"
        onChange={(value) => setVolume(value)}
        onChangeStart={() => setIsMute(false)}
        value={isMute ? 0 : volume}
        w="120px"
        ml={4}
      >
        <SliderTrack bg="gray.700">
          <SliderFilledTrack bg="brand.maincolor" />
        </SliderTrack>
        <SliderThumb boxSize={4}>
          <Box color="brand.maincolor" as={MdGraphicEq} />
        </SliderThumb>
      </Slider>
    </Flex>
  );
};

export default VideoSlider;
