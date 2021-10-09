import Pusher from "pusher-js";

let pusher: Pusher | null = null;
if (process.env.NEXT_PUBLIC_PUSHER_APP_KEY) {
  pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
    cluster: "ap3",
    // authEndpoint: "api/pusher/auth",
    // auth: { params: { name } },
  });
}
export default pusher;
