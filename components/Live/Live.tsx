import { AspectRatio, Box, Flex } from "@chakra-ui/layout";
import { useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import CommentForm from "./CommentForm";
import LiveFooter from "./LiveFooter";
import LiveHeader from "./LiveHeader";
import { LiveInfomationType } from "./LiveType";
import HostVideo from "./Video/HostVideo";
import ListenerVideo from "./Video/ListenerVideo";
import VideoSidemenu from "./VideoSidemenu";

const Live = (props: LiveInfomationType) => {
  const videofixed = useBreakpointValue({ lg: "flex-start", xl: "center" });
  const { currentUser, isAuthChecking } = useCurrentUser();
  const isHost = currentUser?.uid === props.uid;
  return (
    <Box mx={6}>
      <LiveHeader {...props} />
      <Flex justifyContent={videofixed} position="relative">
        <Box w="100%" maxW="5xl" minW="2xl" h="100%">
          <AspectRatio ratio={16 / 9}>
            <Box bg="blue.600" h="calc(100% - 42px)" roundedTopLeft={10}>
              {!isAuthChecking &&
                (isHost ? (
                  <HostVideo {...props} />
                ) : (
                  <ListenerVideo {...props} />
                ))}
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
