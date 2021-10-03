import { NextRouter, useRouter } from "next/router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";

type InputType = {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
};

export const config = {
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

  useEffect(() => {
    //最初の１回だけ
    socket.emit("join", router.query.live, true);
  }, [router, router.query.live, socket]);

  useMemo(() => {
    //リスナーからのoffer待機
    socket.on(
      "P2POfferToHost",
      (offer: RTCSessionDescriptionInit, fromId: string) => {
        setFromId(fromId);
        setOffer(offer);
      }
    );
  }, [socket]);
  useEffect(() => {
    //リスナーからのofferに対応
    ListenerConnectHost({ fromId, offer, socket, stream });
  }, [fromId, offer, socket, stream]);

  const SetMediaState = () => SetMedia(setStream, videoRef);
  return { videoRef, SetMediaState };
};

const SetMedia = async (
  setStream: React.Dispatch<React.SetStateAction<MediaStream | null>>,
  videoRef: React.MutableRefObject<HTMLVideoElement>
) => {
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

  host.onconnectionstatechange = (e) => {
    switch (host.connectionState) {
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
  };
  if (host.signalingState !== "closed" && offer) {
    (async () => {
      await host.setRemoteDescription(offer);
      const answer = await host.createAnswer();
      socket.emit("P2PAnswerFromHost", answer, fromId); //signaling serverに送信
      await host.setLocalDescription(answer);
    })();
  }
  stream &&
    stream.getTracks().forEach((track) => {
      host.addTrack(track, stream);
    });

  let icecount = true;
  host.onicecandidate = (e) => {
    if (icecount) {
      socket.emit("IceCandidateFromHost", e.candidate, fromId);
      icecount = false;
    }
  };
  host.ontrack = (e) => {
    console.log(e);
  };

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
