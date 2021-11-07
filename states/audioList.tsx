import { atom } from "recoil";

export const audioList = atom<MediaDeviceInfo[]>({
  key: "audioList",
  default: [],
  dangerouslyAllowMutability: true,
});

// const [todoList, setTodoList] = useRecoilState(currentUserState); state + set func
// const todoList = useRecoilValue(currentUserState);                     state only
// const setTodoList = useSetRecoilState(currentUserState);            set func only
