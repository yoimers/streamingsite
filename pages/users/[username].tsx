import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { Layout } from "../../components/Layout";
import { useCurrentUser } from "../../hooks/useCurrentUser";

export const UserPage: NextPage = (props) => {
  const { isAuthChecking, currentUser } = useCurrentUser();
  const router = useRouter();
  console.log(props);
  if (isAuthChecking)
    return (
      <Layout title={`Wavelet ${router.query.username}`}>
        ログイン情報を確認中…
      </Layout>
    );
  if (!currentUser)
    return (
      <Layout title={`Wavelet ${router.query.username}`}>
        ログインしていません
      </Layout>
    );
  return (
    <Layout title={`Wavelet ${router.query.username}`}>aaaaaaaaaaaa</Layout>
  );
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
  return { props: { text: params?.username } };
};
//#引数context
//##params ... getStaticPathsからreturnされたroute parameters が入っている context.params = {username:"aa"} みたいな感じ
//##

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { username: "aa" } }, { params: { username: "bb" } }],
    fallback: false,
  };
};

//fallback: false → pathsに含まれないURLは404ページ
//fallback: true  → pathsに含まれないURLのリクエストが来る→fallbackページをレスポンス&裏でHTML/JSONを生成(getStaticPropsも実行)→次からはそのHTML/JSONを返す

//fallbackページの特徴：　ページのpropsは空 {},route.isFallbackがtrue...この情報でfallback用の動作が指定出来る
export default UserPage;
