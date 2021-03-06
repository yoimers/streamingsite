import { useRouter } from "next/router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { io } from "socket.io-client";

// const socket = io("http://localhost:5001");
const URL = "http://localhost:5005";
// const URL = "https://arcane-badlands-27717.herokuapp.com/";
const socket = io(URL, {
  withCredentials: true,
  extraHeaders: {
    "Access-Control-Allow-Origin": "http://localhost:3000", //https://streamingsite-eight.vercel.app/",
    "Access-Control-Allow-Credentials": "true",
  },
});

export const offerOptions = {
  offerToReceiveAudio: true,
  offerToReceiveVideo: true,
};
export const config = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
    { urls: "stun:stun2.l.google.com:19302" },
  ],
};

const useP2PHost = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [fromId, setFromId] = useState("");
  const [offer, setOffer] = useState<RTCSessionDescriptionInit>();
  const router = useRouter();
  const videoRef =
    useRef<HTMLVideoElement>() as React.MutableRefObject<HTMLVideoElement>;
  socket.on("hello", (a) => console.log(a));
  useEffect(() => {
    //最初の１回だけ
    socket.emit("join", router.query.live, true);
  }, [router, router.query.live]);

  useMemo(() => {
    //リスナーからのoffer待機
    socket.on(
      "P2POfferToHost",
      (offer: RTCSessionDescriptionInit, fromId: string) => {
        setFromId(fromId);
        setOffer(offer);
      }
    );
  }, []);
  useEffect(() => {
    //リスナーからのofferに対応
    ListenerConnectHost({ fromId, offer, stream });
  }, [fromId, offer, stream]);

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

interface ListenerConnectHostType {
  offer: RTCSessionDescriptionInit | undefined;
  fromId: string;
  stream: MediaStream | null;
}

//リスナーからホストへ接続
const ListenerConnectHost = ({
  offer,
  fromId,
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
        break;
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
