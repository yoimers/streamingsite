import { IconButton, useColorModeValue } from "@chakra-ui/react";
import React from "react";

type InputType = {
  start: () => void;
};
export const MyIconButton = ({ start }: InputType) => {
  const opacity = useColorModeValue(0.1, 1);

  return (
    <IconButton
      aria-label="video like"
      position="absolute"
      w="40px"
      h="40px"
      zIndex={2}
      opacity={opacity}
      onClick={start}
      _focus={{}}
    />
  );
};
