import { NextPage } from "next";
import React, { useContext } from "react";
import { Layout } from "../components/Layout";
import { useRequireLogin } from "../hooks/useRequireLogin";

const Broadcast: NextPage = () => {
  const { isAuthChecking, currentUser } = useRequireLogin();

  if (isAuthChecking) return <div>ログイン情報を確認中…</div>; 
  if (!currentUser) return <div>ログインしていません</div>;

  return (
    <Layout title="wavlet 放送設定画面">
      <div>放送設定画面</div>
    </Layout>
  );
};

export default Broadcast;
