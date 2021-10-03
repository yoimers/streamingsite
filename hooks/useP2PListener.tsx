import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import { connectionstatechange } from "../components/Live/Video/connectionstatechange";
import { offerOptions } from "../components/Live/Video/HostVideo";
import { config } from "./useP2PHost";

type InputType = {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
};

const useP2PListener = ({ socket }: InputType) => {
  const router = useRouter();
  const remotevideoRef =
    useRef<HTMLVideoElement>() as React.MutableRefObject<HTMLVideoElement>;
  const listenerRef = useRef(new RTCPeerConnection(config));
  const reconnection = useCallback(() => {
    ListenerConnectHost({ listenerRef, socket, remotevideoRef });
  }, [remotevideoRef, socket]);

  useEffect(() => {
    socket.emit("join", router.query.live, false);
    listenerRef.current.onicecandidate = (e) => {
      socket.emit("IceCandidateFromListener", e.candidate);
    };
    listenerRef.current.onconnectionstatechange = connectionstatechange(
      listenerRef.current
    );
  }, [reconnection, remotevideoRef, router.query.live, socket]);

  useEffect(() => {
    reconnection();
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      listenerRef.current.close();
    };
  }, [reconnection, remotevideoRef, socket]);

  return { reconnection, remotevideoRef };
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

  //SDP生成してsignaling serverに送信
  listenerRef.current.createOffer(offerOptions).then(async (offer) => {
    if (
      listenerRef.current.signalingState !== "closed" &&
      !listenerRef.current.localDescription
    ) {
      //signaling serverに送信
      socket.emit("P2POfferFromListener", offer);
      //setLocalDescriptionに設定
      await listenerRef.current.setLocalDescription(offer);
    }
  });

  let remotecount = true;
  socket.on(
    "P2PAnswerToListener",
    async (answer: RTCSessionDescriptionInit) => {
      if (
        remotecount &&
        listenerRef.current.signalingState !== "closed" &&
        !listenerRef.current.remoteDescription
      ) {
        listenerRef.current.setRemoteDescription(answer);
        remotecount = false;
      }
    }
  );

  socket.on("IceCandidateToListener", async (candidate: RTCIceCandidate) => {
    if (listenerRef.current.signalingState !== "closed") {
      await listenerRef.current.addIceCandidate(candidate);
    }
  });
  listenerRef.current.ontrack = (e) => {
    if (
      remotevideoRef.current &&
      remotevideoRef.current.srcObject !== e.streams[0]
    ) {
      remotevideoRef.current.srcObject = e.streams[0];
      // remotevideoRef.current
      //   .play()
      //   .then(() => {
      //     console.log("accepted");
      //   })
      //   .catch(() => console.log("rejected"));
    }
  };

  return listenerRef;
};
export default useP2PListener;
