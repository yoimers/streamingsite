import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import { offerOptions } from "../components/Live/Video/HostVideo";

type InputType = {
  remotevideoRef: React.MutableRefObject<HTMLVideoElement>;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
};
const config = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
    { urls: "stun:stun2.l.google.com:19302" },
  ],
};

const useP2PListener = ({ remotevideoRef, socket }: InputType) => {
  const router = useRouter();
  const listenerRef = useRef<RTCPeerConnection>(new RTCPeerConnection(config));
  const reconnection = useCallback(() => {
    ListenerConnectHost({ listenerRef, socket, remotevideoRef });
  }, [remotevideoRef, socket]);

  useEffect(() => {
    socket.emit("join", router.query.live, false);
    listenerRef.current.addEventListener("icecandidate", async (e) => {
      console.log(e);
      socket.emit("IceCandidateFromListener", e.candidate);
    });
    listenerRef.current.addEventListener("connectionstatechange", (e) => {
      switch (listenerRef.current.connectionState) {
        case "connected":
          break;
        case "disconnected":
        case "closed":
          // setTimeout(() => {
          //   ListenerConnectHost({ listenerRef, socket, remotevideoRef });
          // }, 1000);
          console.log("disconnected");
          break;
        case "failed":
          console.log("failed");
          // if (listenerRef.current) {
          //   ListenerConnectHost({ listenerRef, socket, remotevideoRef });
          // }
          break;
      }
    });
  }, [reconnection, remotevideoRef, router.query.live, socket]);

  useEffect(() => {
    reconnection();
    return listenerRef.current.close;
  }, [reconnection, remotevideoRef, socket]);
  return { reconnection };
};

interface ListenerConnectHostType extends InputType {
  listenerRef: React.MutableRefObject<RTCPeerConnection>;
  remotevideoRef: React.MutableRefObject<HTMLVideoElement>;
}
const ListenerConnectHost = ({
  listenerRef,
  socket,
  remotevideoRef,
}: ListenerConnectHostType) => {
  listenerRef.current = new RTCPeerConnection(config);
  //SDP生成
  listenerRef.current.createOffer(offerOptions).then(async (offer) => {
    if (listenerRef.current.signalingState !== "closed") {
      socket.emit("P2POfferFromListener", offer); //signaling serverに送信
      await listenerRef.current.setLocalDescription(offer);
    }
  });
  let remotecount = 0;
  socket.on(
    "P2PAnswerToListener",
    async (answer: RTCSessionDescriptionInit) => {
      if (
        listenerRef.current.signalingState !== "closed" &&
        !listenerRef.current.remoteDescription
      ) {
        try {
          if (remotecount === 0) {
            await listenerRef.current.setRemoteDescription(answer);
            remotecount += 1;
          }
        } catch (e) {
          console.error(e);
        }
      }
    }
  );

  socket.on("IceCandidateToListener", async (candidate: RTCIceCandidate) => {
    if (listenerRef.current.signalingState !== "closed") {
      await listenerRef.current.addIceCandidate(candidate);
    }
  });
  listenerRef.current.addEventListener("track", (e) => {
    if (remotevideoRef.current.srcObject !== e.streams[0]) {
      remotevideoRef.current.srcObject = e.streams[0];
      remotevideoRef.current.play();
    }
  });

  return listenerRef;
};
export default useP2PListener;
