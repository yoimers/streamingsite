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
const LiveHeader = (props: LiveInfomationType) => {
  const videofixed = useBreakpointValue({ lg: "flex-start", xl: "center" });
  const bg = useColorModeValue("white", "gray.600");

  return (
    <Flex justifyContent={videofixed}>
      <Box rounded={10} p={2} mt={8} w="100%" minWidth="992px" maxW="1351px">
        <Flex>
          <Box>
            <Image
              src={props.imageUrl}
              width={50}
              height={50}
              alt="user image"
            />
          </Box>
          <Stack spacing={0}>
            <Text fontSize="lg" fontWeight="semibold">
              {props.title}
            </Text>
            <Text fontSize="sm" colorScheme="gray" fontWeight="thin">
              {props.displayName}
            </Text>
          </Stack>
          <Box ml="10px">
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
