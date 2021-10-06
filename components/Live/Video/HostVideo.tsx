import { Box } from "@chakra-ui/layout";
import React, { useEffect, useRef, useState } from "react";
import { LiveInfomationType } from "../LiveType";
import { io } from "socket.io-client";
import useP2PHost from "../../../hooks/useP2PHost";
import { Button } from "@chakra-ui/react";
import CommonVideo from "./CommonVideo";

// const socket = io("http://localhost:5001");
const socket = io(
  "https://asia-northeast1-wavelet-f30ce.cloudfunctions.net/signaling",
  {
    withCredentials: true,
    extraHeaders: {
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Credentials": "true",
    },
  }
);

export const offerOptions = {
  offerToReceiveAudio: true,
  offerToReceiveVideo: true,
};

export type StreamTrack = MediaStreamTrack[] | undefined | null;
const HostVideo = (props: LiveInfomationType) => {
  const { videoRef, SetMediaState } = useP2PHost({ socket });
  return (
    <>
      <CommonVideo {...props} ref={videoRef} />
      <Button onClick={SetMediaState}>aaaaaaaaa</Button>
    </>
  );
};

export default HostVideo;
