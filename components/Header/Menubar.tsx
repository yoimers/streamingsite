import { HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/input";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  IconButton,
  useDisclosure,
  HStack,
  DrawerFooter,
  useColorMode,
  Spacer,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import HeadsetIcon from "@material-ui/icons/Headset";
import HomeIcon from "@material-ui/icons/Home";
import React from "react";
import { MenuItem } from "./MenuItem";

type Input = {
  isOpen: boolean;
  [key: string]: any;
};
export const Menubar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  const Icon = (props: Input) => {
    const { isOpen, ...rest } = props;
    return (
      <IconButton
        color="brand.mygray1"
        aria-label="Open menubar"
        _focus={{}}
        onClick={isOpen ? onOpen : onClose}
        icon={<HamburgerIcon w={6} h={6} />}
        {...rest}
      />
    );
  };

  return (
    <>
      <Icon isOpen={true} mr={6} />
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="xss">
        <DrawerOverlay />
        <DrawerContent>
          <HStack pt={1} pl={4} height="60px" boxShadow="base">
            <Icon isOpen={false} mr={6} />
            <Image
              src="/wavelet.svg"
              alt="Title"
              height={40}
              width={135}
              onClick={onClose}
            />
          </HStack>

          <DrawerBody
            mt={2}
            paddingInlineStart={0}
            paddingInlineEnd={0}
            _hover={{}}
          >
            <MenuItem Icon={HomeIcon} onClose={onClose} link="/">
              Home
            </MenuItem>
            <MenuItem Icon={HeadsetIcon} onClose={onClose} link="/live">
              Live
            </MenuItem>
          </DrawerBody>
          <DrawerFooter justifyContent="left" p={4}>
            <Icon isOpen={false} />
            <Spacer />
            {colorMode === "light" ? (
              <IconButton
                aria-label="Change LightMode"
                color="brand.usercolor"
                rounded="full"
                _focus={{}}
                _hover={{}}
                _active={{}}
                onClick={toggleColorMode}
                // eslint-disable-next-line react/jsx-no-undef
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
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
