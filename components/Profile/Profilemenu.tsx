import { Button } from "@chakra-ui/button";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Box, Center } from "@chakra-ui/layout";
import { Menu, MenuList, MenuItem, MenuButton } from "@chakra-ui/menu";
import React from "react";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import TwitterIcon from "@material-ui/icons/Twitter";
import YouTubeIcon from "@material-ui/icons/YouTube";
import AppleIcon from "@material-ui/icons/Apple";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import { signOutWithGoogle } from "../../src/lib/firebase";

type Input = {
  children: JSX.Element;
};
export const Profilemenu = ({ children }: Input): JSX.Element => {
  return (
    <Menu>
      <MenuButton
        as="button"
        rounded="full"
        _active={{ boxShadow: "outline" }}
        _focus={{}}
      >
        <Center
          height="40px"
          width="40px"
          position="relative"
          outlineOffset={0}
        >
          {children}
        </Center>
      </MenuButton>

      <MenuList>
        <MenuItem icon={<AccountBoxIcon />}>マイページ</MenuItem>
        <MenuItem icon={<YouTubeIcon />}>余白１</MenuItem>
        <MenuItem icon={<TwitterIcon />}>余白２</MenuItem>
        <MenuItem icon={<AppleIcon />}>余白３</MenuItem>
        <MenuItem icon={<ExitToAppIcon />} onClick={signOutWithGoogle}>
          ログアウト
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
