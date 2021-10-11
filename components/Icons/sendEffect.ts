import axios from "axios";
import { NextRouter } from "next/router";
import pusher from "../../src/lib/clientpusher";

let time: number;
export const sendEffect = (router: NextRouter, effect: string) => {
  if (time == null || Date.now() - time > 1000 * 5) {
    axios.post(`/api/live/effect?url=${router.query.live}`, {
      effect,
      socket_id: pusher.connection.socket_id,
    });
    time = Date.now();
  }
};
