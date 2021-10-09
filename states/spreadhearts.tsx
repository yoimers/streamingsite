import { atom } from "recoil";

export const spreadHeartsInstance = atom<any>({
  key: "spreadHeartsInstance",
  default: undefined,
  dangerouslyAllowMutability: true,
});

// const [todoList, setTodoList] = useRecoilState(currentUserState); state + set func
// const todoList = useRecoilValue(currentUserState);                     state only
// const setTodoList = useSetRecoilState(currentUserState);            set func only
