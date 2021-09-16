import { NextPage } from "next";
import React from "react";
import { useCurrentUser } from "../../hooks/useCurrentUser";

export const Page: NextPage = () => {
  const { isAuthChecking, currentUser } = useCurrentUser();

  if (isAuthChecking) return <div>ログイン情報を確認中…</div>;
  if (!currentUser) return <div>ログインしていません</div>;
  return <div>aaaaaaaaaaaa</div>;
};
