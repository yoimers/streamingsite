import { NextApiRequest, NextApiResponse } from "next";
import { pusher } from "../../../src/lib/pusher";

export class BodyType {
  liveUrl!: string;
  label!: "Offer" | "Answer" | "Ice";
  toId!: string | "host";
  fromId!: string;
  data!: any;
}
const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { liveUrl, label, data, toId, fromId }: BodyType = req.body;
  console.log(fromId, label);
  switch (label) {
    case "Offer":
      pusher.trigger(
        liveUrl,
        label,
        { liveUrl, label, data, toId, fromId },
        { socket_id: fromId }
      );
      res.send("Offer ok");
      break;

    case "Answer":
      pusher.trigger(
        liveUrl,
        label,
        { liveUrl, label, data, toId, fromId },
        { socket_id: fromId }
      );
      res.send("Answer ok");
      break;
    // case "Ice":
    //   pusher.trigger(
    //     liveUrl,
    //     label,
    //     { liveUrl, label, data, toId, fromId },
    //     { socket_id: fromId }
    //   );
    //   res.send("Ice ok");
    //   break;
    default:
      res.status(400).send("bodyの型が違います");
      break;
  }
};

export default handler;
