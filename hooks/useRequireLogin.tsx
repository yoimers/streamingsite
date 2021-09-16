import { useEffect } from "react";
import { useRouter } from "next/router";
import { useCurrentUser, UserandChecking } from "./useCurrentUser";

export function useRequireLogin() {
  const { isAuthChecking, currentUser }: UserandChecking = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    if (isAuthChecking) return;
    if (!currentUser) router.push("/");
  }, [isAuthChecking, currentUser, router]);

  return { isAuthChecking, currentUser };
}
