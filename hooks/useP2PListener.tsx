import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import { io } from "socket.io-client";
import { connectionstatechange } from "../components/Live/Video/connectionstatechange";
import { movieReload } from "../states/movieReload";
import { config, offerOptions } from "./useP2PHost";

const socket = io("http://localhost:5005", {
  withCredentials: true,
  extraHeaders: {
    "Access-Control-Allow-Origin": "http://localhost:3000",
    "Access-Control-Allow-Credentials": "true",
  },
});

const useP2PListener = () => {
  const router = useRouter();
  const remotevideoRef =
    useRef<HTMLVideoElement>() as React.MutableRefObject<HTMLVideoElement>;
  const listenerRef = useRef(new RTCPeerConnection(config));
  const setMovieReload = useSetRecoilState(movieReload);

  const reconnection = useCallback(() => {
    ListenerConnectHost({ listenerRef, remotevideoRef });
  }, [remotevideoRef]);

  useEffect(() => {
    socket.emit("join", router.query.live, false);
    listenerRef.current.onicecandidate = (e) => {
      socket.emit("IceCandidateFromListener", e.candidate);
    };
    listenerRef.current.onconnectionstatechange = connectionstatechange(
      listenerRef.current
    );
  }, [reconnection, remotevideoRef, router.query.live]);

  useEffect(() => {
    reconnection();
    setMovieReload(reconnection);
  }, [reconnection, remotevideoRef, setMovieReload]);

  return { remotevideoRef };
};

interface ListenerConnectHostType {
  listenerRef: React.MutableRefObject<RTCPeerConnection>;
  remotevideoRef: React.MutableRefObject<HTMLVideoElement>;
}
const ListenerConnectHost = ({
  listenerRef,
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
        console.log("P2PAnswerToListener");
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
