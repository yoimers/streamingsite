import { NextRouter, useRouter } from "next/router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";

type InputType = {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
};

const config = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
    { urls: "stun:stun2.l.google.com:19302" },
  ],
};

const useP2PHost = ({ socket }: InputType) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [fromId, setFromId] = useState("");
  const [offer, setOffer] = useState<RTCSessionDescriptionInit>();
  const router = useRouter();
  const videoRef =
    useRef<HTMLVideoElement>() as React.MutableRefObject<HTMLVideoElement>;

  useMemo(() => {
    socket.on(
      "P2POfferToHost",
      async (offer: RTCSessionDescriptionInit, fromId: string) => {
        setFromId(fromId);
        setOffer(offer);
      }
    );
  }, [socket]);

  useEffect(() => {
    (async () => {
      await Init({ socket, router, setStream, videoRef });
    })();
    return () => {
      setStream(null);
    };
  }, [router, router.query.live, socket]);

  useEffect(() => {
    const host = ListenerConnectHost({ fromId, offer, socket, stream });
    return () => {
      host && host.close();
    };
  }, [fromId, offer, socket, stream]);

  return { videoRef };
};

interface InitType extends InputType {
  router: NextRouter;
  setStream: React.Dispatch<React.SetStateAction<MediaStream | null>>;
  videoRef: React.MutableRefObject<HTMLVideoElement>;
}
const Init = async ({ socket, router, setStream, videoRef }: InitType) => {
  socket.emit("join", router.query.live, true);
  //getUserMedia
  const constrain = {
    audio: true,
    video: {
      width: { ideal: 1280, max: 1920 },
      height: { ideal: 720, max: 1080 },
    },
  };
  const Localstream = await navigator.mediaDevices.getDisplayMedia(constrain);
  videoRef.current.srcObject = Localstream;

  setStream(Localstream);
};

interface ListenerConnectHostType extends InputType {
  offer: RTCSessionDescriptionInit | undefined;
  fromId: string;
  stream: MediaStream | null;
}

//リスナーからホストへ接続
const ListenerConnectHost = ({
  offer,
  fromId,
  socket,
  stream,
}: ListenerConnectHostType) => {
  let host = new RTCPeerConnection(config);
  let icecount = 0;
  host.addEventListener("connectionstatechange", (e) => {
    switch (host.connectionState) {
      case "connected":
        break;
      case "disconnected":
      case "closed":
        console.log("disconnected");
        break;
      case "failed":
        if (host) {
          host.close();
          host = null as any;
        }
    }
  });
  if (host.signalingState !== "closed" && offer) {
    (async () => {
      await host.setRemoteDescription(offer);
      const answer = await host.createAnswer();
      await host.setLocalDescription(answer);
      socket.emit("P2PAnswerFromHost", answer, fromId); //signaling serverに送信
    })();
  }

  stream &&
    stream.getTracks().forEach((track) => {
      host.addTrack(track, stream);
    });

  host.addEventListener("icecandidate", async (e) => {
    if (icecount === 0) {
      socket.emit("IceCandidateFromHost", e.candidate, fromId);
      icecount += 1;
    }
  });

  // socket.on(
  //   "IceCandidateToHost",
  //   async (candidate: RTCIceCandidate, fromId: string) => {
  //     console.log(candidate);
  //     if (host.signalingState !== "closed") {
  //       await host.addIceCandidate(candidate);
  //     }
  //   }
  // );
  return host;
};

//ホストからリスナーへ接続 未完成！！！！！！！！！！！！！！！！！！！！！！！
const HostConnectListener = ({
  offer,
  fromId,
  socket,
  stream,
}: ListenerConnectHostType) => {
  const host = new RTCPeerConnection(config);
  if (host.signalingState !== "closed" && offer) {
    (async () => {
      await host.setRemoteDescription(offer);
      const answer = await host.createAnswer();
      await host.setLocalDescription(answer);
      console.log(answer);
      socket.emit("P2PAnswerFromHost", answer, fromId); //signaling serverに送信
    })();
  }

  stream &&
    stream.getTracks().forEach((track) => {
      host.addTrack(track, stream);
    });

  host.addEventListener("icecandidate", async (e) =>
    socket.emit("IceCandidateFromHost", e.candidate, fromId)
  );

  socket.on(
    "IceCandidateToHost",
    async (candidate: RTCIceCandidate, fromId: string) => {
      if (host.signalingState !== "closed") {
        await host.addIceCandidate(candidate);
      }
    }
  );
  return host;
};
export default useP2PHost;
