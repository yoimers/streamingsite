import {
  Box,
  HStack,
  Stack,
  VStack,
  Text,
  Flex,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { LiveInfomationType } from "./LiveType";
import Image from "next/image";
import Link from "next/link";
import styles from "../Layout.module.css";
import IconImage from "../CommonComponents/IconImage";
const LiveHeader = (props: LiveInfomationType) => {
  const videofixed = useBreakpointValue({ lg: "flex-start", xl: "center" });
  return (
    <Flex justifyContent={videofixed}>
      <Box rounded={10} p={2} w="100%" minWidth="992px" maxW="1351px">
        <Flex>
          <Link href={`/users/${props.uid}`} passHref>
            <Box as="a" w="50px" h="50px" position="relative">
              {/* 放送開始後に放送者の名前/画像を変えても反映されないのは仕様 */}
              <IconImage photoURL={props.photoURL} size={50} />
            </Box>
          </Link>
          <Stack spacing={0} ml={2}>
            <Text fontSize="lg" fontWeight="semibold">
              {props.title}
            </Text>
            <Text fontSize="sm" colorScheme="gray" fontWeight="thin">
              <Link href={`/users/${props.uid}`}>
                <a>{props.displayName}</a>
              </Link>
            </Text>
          </Stack>
          <Box ml={4} pt={1}>
            <Text display="block" fontSize="sm" colorScheme="gray">
              {props.content}
            </Text>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default LiveHeader;
