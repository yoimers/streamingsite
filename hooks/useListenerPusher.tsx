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
      listenerRef.current && listenerRef.current.close();
      listenerRef.current = null as any;
    };
  }, [connection, router.query.live]);
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
    console.log(listenerRef.current.connectionState);
    if (listenerRef.current.connectionState === "connected") {
      const tracks = listenerRef.current.getReceivers().map((r) => r.track);
      const stream = new MediaStream(tracks);
      if (remoteRef.current && remoteRef.current.srcObject !== stream) {
        remoteRef.current.srcObject = stream;
        console.log(stream);
      }
    }
  };
  const offer = await listenerRef.current.createOffer(offerOptions);
  await listenerRef.current.setLocalDescription(offer);
};

export default useListenerPusher;
