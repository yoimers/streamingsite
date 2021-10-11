import { atom, selector } from "recoil";
export type MovieEffectsType = {
  heart: any;
  star: any;
};
const initialValue = {
  heart: undefined,
  star: undefined,
};
export const MovieEffects = atom<MovieEffectsType>({
  key: "MovieEffects",
  default: initialValue,
  dangerouslyAllowMutability: true,
});
// const [todoList, setTodoList] = useRecoilState(currentUserState); state + set func
// const todoList = useRecoilValue(currentUserState);                     state only
// const setTodoList = useSetRecoilState(currentUserState);            set func only
