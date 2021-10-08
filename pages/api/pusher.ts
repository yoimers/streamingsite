import { pusher } from "../../src/lib/pusher";

const handle = (req: any, res: any) => {
  pusher.trigger("chat", "message", {
    message: "hello world",
  });
};

export default handle;
