import { Box } from "@chakra-ui/layout";
import { Player } from "@lottiefiles/react-lottie-player";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import pusher from "../../src/lib/clientpusher";
import { MovieEffects, MovieEffectsType } from "../../states/movieEffects";
import { socketState, SocketState } from "../../states/socket";
import { MyIconButton } from "./MyIconButton";
import { sendEffect } from "./sendEffect";

type InputType = {
  effect: keyof MovieEffectsType;
  src: any;
  height: number;
  width: number;
};

export const EffectIcon = ({ effect, src, height, width }: InputType) => {
  const router = useRouter();
  const ref = useRef<any>(null);
  const effects = useRecoilValue(MovieEffects);
  const animation = effects[effect];
  const [_, setSocket] = useRecoilState(socketState);

  const start = useCallback(() => {
    animation && animation.play();
  }, [animation]);

  const startandpost = useCallback(() => {
    if (ref.current) {
      ref.current.setSeeker(0, true);
      ref.current.play();
      start();
      sendEffect(router, effect);
    }
  }, [effect, router, start]);

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
      channel.bind("effect", (data: any) => {
        if (data.effect === effect) start();
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
  }, [effect, router, setSocket, start]);
  return (
    <Box position="relative" w="40px" h="40px" onClick={startandpost}>
      <Player
        ref={ref}
        renderer="svg"
        src={src}
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
            if (totalFrames - 6 < currentFrame) {
              ref.current.pause();
            }
          }
        }}
        style={{
          zIndex: 1,
          position: "absolute",
          height: `${height}px`,
          width: `${width}px`,
          top: `-${height / 2 - 20}px`,
          left: `-${width / 2 - 20}px`,
        }}
      />
      <MyIconButton start={startandpost} />
    </Box>
  );
};
