import { atom } from "recoil";

type State = {
  broadId: string;
  uid: string;
};
export const liveState = atom<State>({
  key: "liveinfomation",
  default: { broadId: "", uid: "" },
  dangerouslyAllowMutability: true,
});
