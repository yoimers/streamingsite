import { Center } from "@chakra-ui/layout";
import { Menu, MenuList, MenuItem, MenuButton } from "@chakra-ui/menu";
import React from "react";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import TwitterIcon from "@material-ui/icons/Twitter";
import { CgMediaPodcast } from "react-icons/cg";
import AppleIcon from "@material-ui/icons/Apple";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import { signOutWithGoogle } from "../../src/lib/firebase";
import Link from "next/link";
import { useCurrentUser } from "../../hooks/useCurrentUser";

type Input = {
  children: JSX.Element;
};
export const Profilemenu = ({ children }: Input): JSX.Element => {
  const { isAuthChecking, currentUser } = useCurrentUser();
  if (!currentUser) return <></>;
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
        <Link href={`/users/${currentUser.uid}`} passHref>
          <MenuItem icon={<AccountBoxIcon />}>マイページ</MenuItem>
        </Link>
        <Link href="/broadcast" passHref>
          <MenuItem as="a" icon={<CgMediaPodcast size="24px" />}>
            放送する
          </MenuItem>
        </Link>
        <MenuItem icon={<TwitterIcon />}>余白２</MenuItem>
        <MenuItem icon={<AppleIcon />}>余白３</MenuItem>
        <MenuItem icon={<ExitToAppIcon />} onClick={signOutWithGoogle}>
          ログアウト
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
