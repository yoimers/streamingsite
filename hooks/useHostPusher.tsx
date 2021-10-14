import axios from "axios";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import { BodyType } from "../pages/api/live/signaling";
import pusher from "../src/lib/clientpusher";
import { broadCastMedia } from "../states/broadCastMedia";

let hosts: { [key: string]: RTCPeerConnection | null } = {};

const useHostPusher = () => {
  const router = useRouter();
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<any>();
  const SetMediaState = useSetRecoilState(broadCastMedia);
  useEffect(() => {
    let mounted = true;
    if (!mounted || !stream) return;
    const channel = pusher.subscribe(router.query.live as string);
    channel.bind("Offer", async (data: BodyType) => {
      let p2p = new RTCPeerConnection(config);
      stream &&
        stream.getTracks().forEach((track) => {
          p2p.addTrack(track, stream);
        });
      await p2p.setRemoteDescription(data.data); //offerのSDPをセット
      const answer = await p2p.createAnswer();
      const body: BodyType = {
        liveUrl: router.query.live as string,
        label: "Answer",
        toId: data.fromId,
        fromId: pusher.connection.socket_id,
        data: answer,
      };
      await p2p.setLocalDescription(answer);
      await axios.post("/api/live/signaling", body);
      p2p.onconnectionstatechange = (e) => {
        switch (p2p.connectionState) {
          case "failed":
            p2p.close();
            p2p = null as any;
            break;
        }
      };
      hosts[data.fromId] = p2p;
    });

    return () => {
      mounted = false;
    };
  }, [router.query.live, stream]);
  const MediaState = useCallback(() => SetMedia(videoRef, setStream), []);
  useEffect(() => {
    SetMediaState(() => MediaState);
  }, [MediaState, SetMediaState]);
  return { videoRef };
};

const SetMedia = async (
  videoRef: React.MutableRefObject<any>,
  setStream: any
) => {
  const constrain = {
    audio: true,
    video: {
      width: { ideal: 1280, max: 1920 },
      height: { ideal: 720, max: 1080 },
    },
  };
  const Localstream = await navigator.mediaDevices.getUserMedia(constrain);
  videoRef.current.srcObject = Localstream;
  setStream(Localstream);
};

export default useHostPusher;

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
