import { HamburgerIcon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/input";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  IconButton,
  useDisclosure,
  HStack,
  useColorModeValue,
  Heading,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import HeadsetIcon from "@material-ui/icons/Headset";
import HomeIcon from "@material-ui/icons/Home";
import React from "react";
import { MenuItem } from "./MenuItem";

type Input = {
  isOpen: boolean;
};
export const Menubar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const Icon = ({ isOpen = true }: Input) => {
    return (
      <IconButton
        color="brand.mygray1"
        aria-label="Open menubar"
        mr={6}
        _focus={{}}
        onClick={isOpen ? onOpen : onClose}
        icon={<HamburgerIcon w={6} h={6} />}
      />
    );
  };

  return (
    <>
      <Icon isOpen={true} />
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <HStack pt={1} pl={4} height="60px" boxShadow="base">
            <Icon isOpen={false} />
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
        </DrawerContent>
      </Drawer>
    </>
  );
};
