import { atom } from "recoil";

export const movieReload = atom<any>({
  key: "movieReload",
  default: null,
  dangerouslyAllowMutability: true,
});
// const [todoList, setTodoList] = useRecoilState(currentUserState); state + set func
// const todoList = useRecoilValue(currentUserState);                     state only
// const setTodoList = useSetRecoilState(currentUserState);            set func only
