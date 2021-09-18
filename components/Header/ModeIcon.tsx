import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { IconButton, useColorMode } from "@chakra-ui/react";
import React from "react";

const ModeIcon = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return colorMode === "light" ? (
    <IconButton
      aria-label="Change LightMode"
      color="brand.usercolor"
      rounded="full"
      _focus={{}}
      _hover={{}}
      _active={{}}
      onClick={toggleColorMode}
      icon={<MoonIcon w={6} h={6} />}
    />
  ) : (
    <IconButton
      aria-label="Change DarkMode"
      color="brand.usercolor"
      rounded="full"
      _focus={{}}
      _hover={{}}
      _active={{}}
      onClick={toggleColorMode}
      icon={<SunIcon w={6} h={6} />}
    />
  );
};

export default ModeIcon;
