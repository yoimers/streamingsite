import { useColorModeValue } from "@chakra-ui/color-mode";
import { HStack, Heading } from "@chakra-ui/layout";
import { SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import Link from "next/link";
import React, { ReactNode } from "react";

type Input = {
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  children: ReactNode;
  onClose: () => void;
  link: string;
};
export const MenuItem = ({ link, Icon, children, onClose }: Input) => {
  const menucolor = useColorModeValue("brand.h2", "gray.200");
  const menuhover = useColorModeValue("gray.100", "gray.600");
  return (
    <Link href={link} passHref>
      <HStack
        as="a"
        onClick={onClose}
        h={10}
        pl={6}
        color={menucolor}
        _hover={{
          bg: menuhover,
        }}
        animation="linear"
        transition="background-color 0.1s linear"
      >
        <Icon fontSize="medium" />
        <Heading variant="menuitem" size="md">
          {children}
        </Heading>
      </HStack>
    </Link>
  );
};
