import { User } from "firebase/auth";
import { atom } from "recoil";

// undefined : ログイン確認中の状態
// null      : ログイン確認をした結果、ログインしていない状態

export const currentUserState = atom<undefined | null | User>({
  key: "CurrentUser",
  default: undefined,
  dangerouslyAllowMutability: true,
});

// const [todoList, setTodoList] = useRecoilState(currentUserState); state + set func
// const todoList = useRecoilValue(currentUserState);                     state only
// const setTodoList = useSetRecoilState(currentUserState);            set func only
