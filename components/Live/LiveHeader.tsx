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
const LiveHeader = (props: LiveInfomationType) => {
  const videofixed = useBreakpointValue({ lg: "flex-start", xl: "center" });
  return (
    <Flex justifyContent={videofixed}>
      <Box rounded={10} p={2} mt={8} w="100%" minWidth="992px" maxW="1351px">
        <Flex>
          <Box w="50px" h="50px" position="relative">
            <Image
              src={props.photoURL}
              layout="fill"
              objectFit="cover"
              alt="user image"
              className={styles.image}
            />
          </Box>
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
