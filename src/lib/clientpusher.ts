import Pusher from "pusher-js";

const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_API_KEY as string, {
  cluster: "ap3",
  // authEndpoint: "api/pusher/auth",
  // auth: { params: { name } },
});
export default pusher;
