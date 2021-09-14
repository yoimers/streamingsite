import { HStack, Center } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/system";
import React, { useState } from "react";
import { SingInButton, SingUpButton } from "../mycomponents/HeaderButton";

type Input = {
  isSignUp: boolean;
  setIsSignUp: React.Dispatch<React.SetStateAction<boolean>>;
};
const props = {
  height: "100%",
  width: "50%",
  _hover: {},
  _active: {},
};
const ToggleInUp = ({ isSignUp, setIsSignUp }: Input) => {
  const loginbackground = useColorModeValue("brand.maincolor", "blue.500");
  const background = useColorModeValue("brand.mygray2", "gray.600");

  const color = useColorModeValue("brand.usercolor", "gray.200");
  return (
    <HStack height="68px" background={background} rounded="full" spacing={0}>
      <SingUpButton
        {...props}
        color={isSignUp ? "white" : color}
        background={isSignUp ? loginbackground : "rgba(0, 0, 0, 0)"}
        onClick={() => setIsSignUp(true)}
      >
        ログイン
      </SingUpButton>
      <SingInButton
        {...props}
        color={!isSignUp ? "white" : color}
        background={!isSignUp ? loginbackground : "rgba(0, 0, 0, 0)"}
        onClick={() => setIsSignUp(false)}
      >
        新規登録
      </SingInButton>
    </HStack>
  );
};

export default ToggleInUp;
