import { AspectRatio, Box, Flex } from "@chakra-ui/layout";
import { useBreakpointValue } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import CommentForm from "./CommentForm";
import LiveFooter from "./LiveFooter";
import LiveHeader from "./LiveHeader";
import { LiveInfomationType } from "./LiveType";
import VideoSidemenu from "./VideoSidemenu";

const Live = (props: LiveInfomationType) => {
  const videofixed = useBreakpointValue({ lg: "flex-start", xl: "center" });
  const router = useRouter();

  return (
    <Box mx={6}>
      <LiveHeader {...props} />
      <Flex justifyContent={videofixed} position="relative">
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
      <LiveFooter {...props} />
      <Box pb="50px" />
    </Box>
  );
};

export default Live;
