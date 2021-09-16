import { atom } from "recoil";
import { User } from "../src/lib/AuthType";

// undefined : ログイン確認中の状態
// null      : ログイン確認をした結果、ログインしていない状態
export const currentUserState = atom<undefined | null | User>({
  key: "CurrentUser",
  default: undefined,
  dangerouslyAllowMutability: true,
});

// const [todoList, setTodoList] = useRecoilState(todoListState); state + set func
// const todoList = useRecoilValue(todoListState);                     state only
// const setTodoList = useSetRecoilState(todoListState);            set func only
