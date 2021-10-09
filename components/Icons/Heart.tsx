import animationData from "../../public/67021-love-animation-with-particle.json";
import { Player } from "@lottiefiles/react-lottie-player";
import React, { useCallback, useEffect, useRef } from "react";
import { Box, IconButton } from "@chakra-ui/react";
import { useRecoilState, useRecoilValue } from "recoil";
import { spreadHeartsInstance } from "../../states/spreadhearts";
import Pusher from "pusher-js";
import { useRouter } from "next/router";
import { SocketState, socketState } from "../../states/socket";
import axios from "axios";

// Pusher.logToConsole = true;
const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_API_KEY as string, {
  cluster: "ap3",
  // authEndpoint: "api/pusher/auth",
  // auth: { params: { name } },
});
export const Heart = () => {
  const router = useRouter();
  const ref = useRef<any>(null);
  const SpreadHeartsInstance = useRecoilValue(spreadHeartsInstance);
  const [socket, setSocket] = useRecoilState(socketState);

  const startandpost = async () => {
    if (ref.current) {
      ref.current.setSeeker(0, true);
      ref.current.play();
      start();
      await axios.post(`/api/live/heart?url=${router.query.live}`, {
        socket_id: pusher.connection.socket_id,
      });
    }
  };

  const start = () => {
    console.log(SpreadHeartsInstance);
    SpreadHeartsInstance && SpreadHeartsInstance.play();
  };
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      pusher.connection.bind("connected", () => {
        setSocket((prev: SocketState) => ({
          ...prev,
          socketId: pusher.connection.socket_id,
        }));
      });
      const channel = pusher.subscribe(router.query.live as string);
      channel.bind("heart", (data: any) => {
        start();
      });
    }
    pusher.connection.bind("disconnected", () => {
      console.log("disconnected");
      setSocket((prev: SocketState) => ({
        ...prev,
        socketId: null,
      }));
    });
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);
  return (
    <>
      <Box position="relative" w="40px" h="40px">
        <Player
          ref={ref}
          renderer="svg"
          src={animationData}
          autoplay={false}
          loop={false}
          onEvent={(event) => {
            if (["load", "complete"].includes(event)) {
              const totalFrames = ref.current.state.instance.totalFrames;
              ref.current.setSeeker(totalFrames, true);
            }
            if (["frame"].includes(event)) {
              const totalFrames = ref.current.state.instance.totalFrames;
              const currentFrame = ref.current.state.instance.currentFrame;
              if (totalFrames - 2 < currentFrame) {
                ref.current.pause();
              }
            }
          }}
          style={{
            height: "100px",
            width: "100px",
            position: "absolute",
            top: "-30px",
            left: "-30px",
          }}
        />
        <IconButton
          aria-label="video like"
          position="absolute"
          w="40px"
          h="40px"
          top="-0px"
          onClick={startandpost}
          _focus={{}}
        />
      </Box>
    </>
  );
};
