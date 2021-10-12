import React, { useEffect } from "react";
import { LiveInfomationType } from "../LiveType";
import { Box, Button } from "@chakra-ui/react";
import useP2PListener from "../../../hooks/useP2PListener";
import CommonVideo from "./CommonVideo";
import useListenerPusher from "../../../hooks/useListenerPusher";

const ListenerVideo = (props: LiveInfomationType) => {
  const { remoteRef, connection } = useListenerPusher();
  return (
    <>
      <CommonVideo {...props} ref={remoteRef} />
      <Button
        onClick={async () => {
          await remoteRef.current.play();
        }}
      >
        aaaaaaaaa
      </Button>
      <Button
        onClick={async () => {
          connection();
        }}
      >
        aaaaaaaaa
      </Button>
    </>
  );
};

export default ListenerVideo;
