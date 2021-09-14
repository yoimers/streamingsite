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
  Center,
  useColorModeValue,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import HeadsetIcon from "@material-ui/icons/Headset";
import HomeIcon from "@material-ui/icons/Home";

type Input = {
  isOpen: boolean;
};
export const Menubar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const menucolor = useColorModeValue("brand.h2", "rgba(255, 255, 255, 0.92)");
  const menuhover = useColorModeValue("gray.100", "gray.600");
  const hoverbackground = useColorModeValue("gray.200", "gray.700");
  const menuhoverbackground = useColorModeValue("gray.200", "gray.700");
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

  const BodyHStack = (props: any) => {
    return (
      <HStack
        spacing={6}
        h="40px"
        px={6}
        _hover={{ background: menuhover }}
        {...props}
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

          <DrawerBody mt={2} paddingInlineStart={0} paddingInlineEnd={0}>
            <Link href="/" passHref>
              <BodyHStack onClick={onClose}>
                <HomeIcon fontSize="default" />
                <Center fontSize="xl" textColor={menucolor} as="a">
                  Home
                </Center>
              </BodyHStack>
            </Link>
            <Link href="/live" passHref>
              <BodyHStack onClick={onClose}>
                <HeadsetIcon fontSize="default" />
                <Center fontSize="xl" textColor={menucolor} as="a">
                  Live
                </Center>
              </BodyHStack>
            </Link>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
