import { atom } from "recoil";

export type SocketState = {
  socketId: string | null;
  [key: string]: any;
};
export const socketState = atom<SocketState>({
  key: "socketState",
  default: { socketId: null },
  dangerouslyAllowMutability: true,
});

// const [todoList, setTodoList] = useRecoilState(currentUserState); state + set func
// const todoList = useRecoilValue(currentUserState);                     state only
// const setTodoList = useSetRecoilState(currentUserState);            set func only
