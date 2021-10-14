import axios from "axios";
import { NextRouter, useRouter } from "next/router";
import { MutableRefObject, useCallback, useEffect, useRef } from "react";
import { useSetRecoilState } from "recoil";
import { BodyType } from "../pages/api/live/signaling";
import pusher from "../src/lib/clientpusher";
import { movieReload } from "../states/movieReload";
import { config, offerOptions } from "./useHostPusher";

const useListenerPusher = () => {
  const router = useRouter();
  const setMovieReload = useSetRecoilState(movieReload);
  const listenerRef = useRef<RTCPeerConnection>(new RTCPeerConnection(config));
  const remoteRef = useRef<any>();

  const connection = useCallback(() => {
    ListenerConnectHost({
      router,
      listenerRef,
      remoteRef,
    });
  }, [router]);

  useEffect(() => {
    let mounted = true;
    setMovieReload(() => connection);
    if (!mounted || !listenerRef.current) return;
    pusher.connection.bind("connected", connection);
    pusher.connection.bind("disconnected", () => {
      listenerRef.current && listenerRef.current.close();
      listenerRef.current = null as any;
    });
    const channel = pusher.subscribe(router.query.live as string);
    channel.bind("Answer", async (data: any) => {
      if (
        data.toId === pusher.connection.socket_id &&
        !listenerRef.current.currentRemoteDescription
      ) {
        await listenerRef.current.setRemoteDescription(data.data); //AnswerのSDPをセット
      }
    });

    return () => {
      console.log("unmoundted");
      mounted = false;
      // listenerRef.current && listenerRef.current.close();
      // listenerRef.current = null as any;
    };
  }, [connection, router.query.live, setMovieReload]);
  return { remoteRef, connection };
};
interface ListenerConnectHostType {
  router: NextRouter;
  listenerRef: MutableRefObject<RTCPeerConnection>;
  remoteRef: any;
}
const ListenerConnectHost = async ({
  router,
  listenerRef,
  remoteRef,
}: ListenerConnectHostType) => {
  if (listenerRef.current) {
    listenerRef.current.close();
    listenerRef.current = null as any;
  }
  listenerRef.current = new RTCPeerConnection(config);
  listenerRef.current.addTransceiver("video", { direction: "recvonly" });
  listenerRef.current.addTransceiver("audio", { direction: "recvonly" });

  listenerRef.current.ontrack = (e) => {
    console.log("onTrack!!!!!!");
    if (remoteRef.current && remoteRef.current.srcObject !== e.streams[0]) {
      remoteRef.current.srcObject = e.streams[0];
      remoteRef.current
        .play()
        .then(() => {
          console.log("accepted");
        })
        .catch(() => console.log("rejected"));
    }
  };
  listenerRef.current.onicecandidate = async (e) => {
    if (!e.candidate) {
      const body: BodyType = {
        liveUrl: router.query.live as string,
        label: "Offer",
        toId: "host",
        fromId: pusher.connection.socket_id,
        data: listenerRef.current.localDescription,
      };
      await axios.post("/api/live/signaling", body);
    }
  };

  listenerRef.current.onconnectionstatechange = (e: any) => {
    switch (listenerRef.current.connectionState) {
      case "disconnected":
      case "closed":
      case "failed":
        console.log("close!");
        listenerRef.current.close();
        listenerRef.current = null as any;
        break;
    }
  };
  const offer = await listenerRef.current.createOffer(offerOptions);
  await listenerRef.current.setLocalDescription(offer);
};

export default useListenerPusher;
