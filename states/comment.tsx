import { atom } from "recoil";

// undefined : ログイン確認中の状態
// null      : ログイン確認をした結果、ログインしていない状態

export const commentState = atom<string>({
  key: "comment",
  default: "",
  dangerouslyAllowMutability: true,
});
