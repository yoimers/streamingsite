import { pusher } from "../../src/lib/pusher";

const handler = (req: any, res: any) => {
  pusher.trigger("chat", "message", {
    message: req.body,
  });

  res.end();
};

export default handler;
