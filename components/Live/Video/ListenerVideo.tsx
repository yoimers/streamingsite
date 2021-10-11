import React, { useRef } from "react";
import { LiveInfomationType } from "../LiveType";
import { io } from "socket.io-client";
import { Box, Button } from "@chakra-ui/react";
import useP2PListener from "../../../hooks/useP2PListener";
import CommonVideo from "./CommonVideo";

const ListenerVideo = (props: LiveInfomationType) => {
  const { remotevideoRef } = useP2PListener();
  // const remotevideoRef = useRef();

  return (
    <>
      <CommonVideo {...props} ref={remotevideoRef as any} />
      <Box w="100%">
        {/* <video
          style={{ width: "100%", height: "100%" }}
          ref={remotevideoRef as any}
          playsInline
          autoPlay
        /> */}
      </Box>
    </>
  );
};

export default ListenerVideo;
