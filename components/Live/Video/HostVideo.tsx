import React, { useRef } from "react";
import { LiveInfomationType } from "../LiveType";
import useP2PHost from "../../../hooks/useP2PHost";
import { Button } from "@chakra-ui/react";
import CommonVideo from "./CommonVideo";
import useHostPusher from "../../../hooks/useHostPusher";

const HostVideo = (props: LiveInfomationType) => {
  const { videoRef, SetMediaState } = useHostPusher();
  return (
    <>
      <CommonVideo {...props} ref={videoRef} />
      <Button onClick={SetMediaState}>aaaaaaaaa</Button>
    </>
  );
};

export default HostVideo;
