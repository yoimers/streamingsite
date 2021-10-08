import React from "react";
import { LiveInfomationType } from "../LiveType";
import { io } from "socket.io-client";
import { Box, Button } from "@chakra-ui/react";
import useP2PListener from "../../../hooks/useP2PListener";
import CommonVideo from "./CommonVideo";

const ListenerVideo = (props: LiveInfomationType) => {
  const { reconnection, remotevideoRef } = useP2PListener();
  return (
    <>
      {/* <CommonVideo {...props} /> */}
      <Box w="100%">
        <video
          style={{ width: "100%", height: "100%" }}
          ref={remotevideoRef as any}
          playsInline
          autoPlay
        />
        <Button w={100} h={100} bg="tomato" onClick={reconnection}>
          aaaaaaaaaaaaaaaaaa
        </Button>
      </Box>
    </>
  );
};

export default ListenerVideo;
