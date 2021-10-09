import { pusher } from "../../../src/lib/pusher";

const handler = (req: any, res: any) => {
  const liveUrl: string = req.query.url;
  const socketId: string = req.body.socket_id;
  console.log("send!");
  pusher.trigger(liveUrl, "heart", {}, { socket_id: socketId });
  res.end();
};

export default handler;
