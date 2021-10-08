import React from "react";
import { LiveInfomationType } from "../LiveType";
import useP2PHost from "../../../hooks/useP2PHost";
import { Button } from "@chakra-ui/react";
import CommonVideo from "./CommonVideo";

export type StreamTrack = MediaStreamTrack[] | undefined | null;

const HostVideo = (props: LiveInfomationType) => {
  const { videoRef, SetMediaState } = useP2PHost();

  return (
    <>
      <CommonVideo {...props} ref={videoRef} />
      <Button onClick={SetMediaState}>aaaaaaaaa</Button>
    </>
  );
};

export default HostVideo;
