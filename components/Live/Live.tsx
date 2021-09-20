import {
  AspectRatio,
  Box,
  Center,
  Flex,
  HStack,
  VStack,
} from "@chakra-ui/layout";
import { useBreakpointValue } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import CommentForm from "./CommentForm";
import VideoSidemenu from "./VideoSidemenu";
import moment from "moment";
import { CommentType } from "./LiveType";
import { db } from "../../src/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

const Live = () => {
  const videofixed = useBreakpointValue({ lg: "flex-start", xl: "center" });
  const router = useRouter();

  return (
    <Flex mt={20} mx={6} justifyContent={videofixed} pb="50px">
      <Box w="100%" maxW="5xl" minW="2xl" h="100%">
        <AspectRatio ratio={16 / 9}>
          <Box bg="blue.600" h="calc(100% - 42px)" roundedTopLeft={10}>
            {router.query.live}
          </Box>
        </AspectRatio>
        <CommentForm />
      </Box>
      <VideoSidemenu />
    </Flex>
  );
};

export default Live;
