import axios from "axios";
import { useRouter } from "next/router";
import connection from "pusher-js/types/src/core/connection/connection";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { BodyType } from "../pages/api/live/signaling";
import pusher from "../src/lib/clientpusher";

let hosts: { [key: string]: RTCPeerConnection } = {};

const useHostPusher = () => {
  const router = useRouter();
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<any>();
  useEffect(() => {
    let mounted = true;
    if (!mounted) return;
    pusher.connection.bind("connected", () => {});
    pusher.connection.bind("disconnected", () => {});
    const channel = pusher.subscribe(router.query.live as string);
    channel.bind("Offer", async (data: BodyType) => {
      console.log("recieve offer!!");
      const p2p = new RTCPeerConnection(config);
      stream &&
        stream.getTracks().forEach((track) => {
          p2p.addTrack(track, stream);
        });
      await p2p.setRemoteDescription(data.data); //offerのSDPをセット
      p2p.ontrack = (e: any) => console.log(e);
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

      p2p.onconnectionstatechange = (e: any) =>
        console.log(e.target.connectionState);
      hosts[data.fromId] = p2p;
    });

    return () => {
      mounted = false;
    };
  }, [router.query.live, stream]);
  const SetMediaState = useCallback(() => SetMedia(videoRef, setStream), []);
  return { videoRef, SetMediaState };
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
    // { urls: "stun:stun1.l.google.com:19302" },
    // { urls: "stun:stun2.l.google.com:19302" },
  ],
};
