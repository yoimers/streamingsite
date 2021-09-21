import { User } from "firebase/auth";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../states/currentUser";

export type UserandChecking = {
  currentUser: User | undefined | null;
  isAuthChecking: boolean;
};
export function useCurrentUser(): UserandChecking {
  const currentUser = useRecoilValue(currentUserState);
  const isAuthChecking = currentUser === undefined;
  
  return {
    currentUser,
    isAuthChecking,
  };
}
