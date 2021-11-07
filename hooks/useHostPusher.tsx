import axios from "axios";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { BodyType } from "../pages/api/live/signaling";
import pusher from "../src/lib/clientpusher";
import { audioList } from "../states/audioList";
import { broadCastMedia } from "../states/broadCastMedia";
import { selectedAudioId } from "../states/selectedAudio";

let hosts: { [key: string]: RTCPeerConnection | null } = {};

const useHostPusher = () => {
  const router = useRouter();
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<any>();
  const SetMediaState = useSetRecoilState(broadCastMedia);
  const SetAudioList = useSetRecoilState(audioList);
  const SelectedAudioId = useRecoilValue(selectedAudioId);
  const [channel, setChannel] = useState(
    pusher.subscribe(router.query.live as string)
  );
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
    console.log("render");
    return () => {
      mounted = false;
      console.log("unmount");
      pusher.unsubscribe(router.query.live as string);
      stream.getTracks().forEach((track) => track.stop());
    };
  }, [router.query.live, stream]);

  useEffect(() => {
    (async () => {
      await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      const devices = await navigator.mediaDevices.enumerateDevices();
      const OBS = devices.filter(
        (device) => device.label === "OBS Virtual Camera"
      );
      if (!OBS.length) {
        alert("OBSが入っていません！");
        throw Error("OBSが入っていません！");
      }
      const audiolist = devices.filter(
        (device) => device.kind === "audioinput"
      );
      SetAudioList(audiolist);
    })();
  }, [SetAudioList]);

  const SetMedia = useCallback(async () => {
    //OBSのみ許容
    const devices = await navigator.mediaDevices.enumerateDevices();
    const OBS = devices.filter(
      (device) => device.label === "OBS Virtual Camera"
    );
    const videoSource = OBS[0].deviceId;
    const constraints = {
      audio: {
        deviceId: SelectedAudioId ? { exact: SelectedAudioId } : undefined,
      },
      video: { deviceId: videoSource ? { exact: videoSource } : undefined },
    };
    const Localstream = await navigator.mediaDevices.getUserMedia(constraints);
    videoRef.current.srcObject = Localstream;
    setStream(Localstream);
  }, [SelectedAudioId]);

  useEffect(() => {
    console.log(SelectedAudioId);
  }, [SelectedAudioId]);
  const MediaState = useCallback(() => SetMedia(), [SetMedia]);

  useEffect(() => {
    SetMediaState(() => MediaState);
  }, [MediaState, SetMediaState]);

  return { videoRef };
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
