import { Box } from "@chakra-ui/react";
import React from "react";
import { EffectIcon } from "./EffectIcon";
import ReLoad from "./ReLoad";
import StarAnimation from "../../public/156-star-blast.json";
import HeartAnimation from "../../public/67021-love-animation-with-particle.json";

export const EffectIcons = () => {
  return (
    <>
      <EffectIcon effect="star" src={StarAnimation} width={80} height={80} />
      <Box mx={1} />
      <EffectIcon
        effect="heart"
        src={HeartAnimation}
        width={100}
        height={100}
      />
      <Box mx={1} />
      <ReLoad />
    </>
  );
};
