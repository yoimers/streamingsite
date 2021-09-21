import { User } from "@firebase/auth";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { useCurrentUser } from "./useCurrentUser";

export type IsMyPage = {
  isMyPage: boolean;
  isAuthChecking: boolean;
  currentUser: User | null | undefined;
};
export function useIsMyPage(): IsMyPage {
  const { isAuthChecking, currentUser } = useCurrentUser();
  const [isMyPage, setIsMyPage] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    if (currentUser && currentUser.uid === router.query.uid) {
      setIsMyPage(true);
    }
    return () => {
      setIsMyPage(false);
    };
  }, [currentUser, currentUser?.uid, router.query.uid]);

  return { isMyPage, isAuthChecking, currentUser };
}
