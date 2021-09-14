import { Button, ButtonProps, useColorModeValue } from "@chakra-ui/react";
import { FC } from "react";
import Link from "next/link";

export const HeaderButton: FC<ButtonProps> = (props) => {
  return (
    <Button
      color="white"
      size="lg"
      background="brand.maincolor"
      rounded="full"
      fontSize="2xl"
      fontWeight="semibold"
      letterSpacing="0.16px"
      _hover={{}}
      _focus={{}}
      _active={{}}
      {...props}
    />
  );
};

export const SingInButton: FC<ButtonProps> = (props) => {
  const background = useColorModeValue("brand.mygray2", "gray.600");
  const color = useColorModeValue("brand.usercolor", "gray.200");
  const hoverbackground = useColorModeValue("gray.200", "gray.600");
  const activebackground = useColorModeValue("gray.300", "gray.500");
  return (
    <Link href="/signup" passHref>
      <HeaderButton
        as="a"
        color={color}
        background={background}
        _hover={{ background: hoverbackground }}
        _active={{ background: activebackground }}
        {...props}
      />
    </Link>
  );
};

export const SingUpButton: FC<ButtonProps> = (props) => {
  const background = useColorModeValue("brand.maincolor", "blue.500");
  const hoverbackground = useColorModeValue("blue.600", "blue.600");
  const activebackground = useColorModeValue("blue.800", "blue.700");

  return (
    <Link href="/signup" passHref>
      <HeaderButton
        as="a"
        color="white"
        background={background}
        _hover={{ background: hoverbackground }}
        _active={{ background: activebackground }}
        {...props}
      />
    </Link>
  );
};
