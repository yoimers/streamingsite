import { Box, Flex } from "@chakra-ui/layout";
import React from "react";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import useIsMobile from "../../hooks/useIsMobile";
import CommentForm from "./CommentForm";
import LiveFooter from "./LiveFooter";
import LiveHeader from "./LiveHeader";
import { LiveInfomationType } from "./LiveType";
import HostVideo from "./Video/HostVideo";
import VideoSidemenu from "./VideoSidemenu";

const Live = (props: LiveInfomationType) => {
  const isMobile = useIsMobile();
  const { currentUser, isAuthChecking } = useCurrentUser();
  const isHost = currentUser?.uid === props.uid;
  return (
    <Box px={{ base: 0, md: 6 }} pt={{ base: 0, md: 8 }}>
      <Flex
        mx={{ base: 0, md: "auto" }}
        flexDirection="column"
        minWidth={{ base: "100%", md: "1080px" }}
        maxW="6xl"
      >
        {!isMobile && <LiveHeader {...props} />}
        <Flex
          flexDirection={{ base: "column", md: "row" }}
          h={{ base: "calc(100vh - 72px)", md: "100%" }}
        >
          <Box w="100%">
            {!isAuthChecking &&
              (isHost ? (
                <HostVideo {...props} />
              ) : (
                <></>
                // <ListenerVideo {...props} />
              ))}
            {/* <CommonVideo {...props} /> */}
            <CommentForm createdAt={props.createdAt} />
          </Box>
          <VideoSidemenu />
        </Flex>
        <LiveFooter {...props} />
      </Flex>
    </Box>
  );
};

export default Live;
