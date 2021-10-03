import React from "react";
import { LiveInfomationType } from "../LiveType";
import { io } from "socket.io-client";
import { Box, Button } from "@chakra-ui/react";
import useP2PListener from "../../../hooks/useP2PListener";

// const socket = io("http://localhost:5001");
const socket = io(
  "https://asia-northeast1-wavelet-f30ce.cloudfunctions.net/signaling",
  {
    withCredentials: true,
    extraHeaders: {
      "Access-Control-Allow-Origin": "http://localhost:3000",
    },
  }
);

const ListenerVideo = (props: LiveInfomationType) => {
  const { reconnection, remotevideoRef } = useP2PListener({
    socket,
  });
  // const reconnection = () => {};
  return (
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
  );
};

export default ListenerVideo;
