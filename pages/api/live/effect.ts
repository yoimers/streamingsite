import { pusher } from "../../../src/lib/pusher";

let time: number;
const handler = (req: any, res: any) => {
  console.log(Date.now() - time);
  if (time == null || Date.now() - time > 1000 * 5) {
    const liveUrl: string = req.query.url;
    const effect = req.body.effect;
    const socketId: string = req.body.socket_id;
    pusher.trigger(liveUrl, "effect", { effect }, { socket_id: socketId });
    time = Date.now();
    res.end();
  }
  res.end();
};

export default handler;
