import { Button } from "@chakra-ui/button";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Center } from "@chakra-ui/layout";
import { Menu, MenuList, MenuItem, MenuButton } from "@chakra-ui/menu";
import React from "react";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import TwitterIcon from "@material-ui/icons/Twitter";
import YouTubeIcon from "@material-ui/icons/YouTube";
import AppleIcon from "@material-ui/icons/Apple";
import AccountBoxIcon from "@material-ui/icons/AccountBox";

type Input = {
  main: JSX.Element;
};
export const Profilemenu = ({ main }: Input): JSX.Element => {
  return (
    <Menu>
      <MenuButton
        as={Button}
        width="40px"
        height="40px"
        rounded="full"
        _active={{ boxShadow: "outline" }}
        _focus={{}}
      >
        {main}
      </MenuButton>
      <MenuList>
        <MenuItem icon={<AccountBoxIcon />}>マイページ</MenuItem>
        <MenuItem icon={<YouTubeIcon />}>余白１</MenuItem>
        <MenuItem icon={<TwitterIcon />}>余白２</MenuItem>
        <MenuItem icon={<AppleIcon />}>余白３</MenuItem>
        <MenuItem icon={<ExitToAppIcon />}>ログアウト</MenuItem>
      </MenuList>
    </Menu>
  );
};
