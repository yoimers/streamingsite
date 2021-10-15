import { Flex, Box } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <Flex flexDirection="column" fontSize="xs" opacity={0.6} h="20px">
      <Flex justifyContent="center">
        <Link href="/question">お問い合わせ</Link>
        <Box mx={2} />
        <Link href="/service">利用規約</Link>
        <Box mx={2} />
        <Link href="/privacy">プライバシーポリシー</Link>
      </Flex>
    </Flex>
  );
};

export default Footer;
