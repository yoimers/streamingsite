import { NextApiRequest, NextApiResponse } from "next";
import { sendData } from "next/dist/server/api-utils";
import { pusher } from "../../../src/lib/pusher";

let time: number;
const handler = (req: NextApiRequest, res: NextApiResponse) => {
  console.log(Date.now() - time);
  if (time == null || Date.now() - time > 1000 * 5) {
    const liveUrl = req.query.url;
    const effect = req.body.effect;
    const socketId: string = req.body.socket_id;
    pusher.trigger(liveUrl, "effect", { effect }, { socket_id: socketId });
    time = Date.now();
    res.end();
  }
  res.end();
};

export default handler;
