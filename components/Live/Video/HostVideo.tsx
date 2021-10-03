import { Box } from "@chakra-ui/layout";
import React, { useEffect, useRef, useState } from "react";
import { LiveInfomationType } from "../LiveType";
import { io } from "socket.io-client";
import useP2PHost from "../../../hooks/useP2PHost";
import { Button } from "@chakra-ui/react";

const socket = io("http://localhost:5001");
export const offerOptions = {
  offerToReceiveAudio: true,
  offerToReceiveVideo: true,
};

export type StreamTrack = MediaStreamTrack[] | undefined | null;
const HostVideo = (props: LiveInfomationType) => {
  const { videoRef, SetMediaState } = useP2PHost({ socket });
  return (
    <Box>
      <video ref={videoRef as any} autoPlay playsInline></video>
      <Button onClick={SetMediaState}>aaaaaaaa</Button>
    </Box>
  );
};

export default HostVideo;
