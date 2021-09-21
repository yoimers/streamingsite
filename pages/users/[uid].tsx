import { doc } from "@firebase/firestore";
import { getDoc } from "firebase/firestore";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import MySpinner from "../../components/CommonComponents/MySpinner";
import NotLogin from "../../components/CommonComponents/NotLogin";
import { Layout } from "../../components/Layout";
import { useIsMyPage } from "../../hooks/useIsMyPage";
import { db } from "../../src/lib/firebase";

export const UserPage: NextPage = (props) => {
  const { isMyPage, isAuthChecking, currentUser } = useIsMyPage();
  const router = useRouter();
  if (Object.keys(props).length === 0) router.push("/404");

  if (isAuthChecking) return <MySpinner />;
  if (!currentUser) return <NotLogin />;
  return (
    <Layout title={`Wavelet ${router.query.username}`}>
      {isMyPage.toString()}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  if (!params) return { props: {} };

  const uidref = doc(db, `users/${params.uid}`);
  const docSnap = await getDoc(uidref);
  if (docSnap.exists()) {
    return {
      props: {
        uid: params.uid,
        ...docSnap.data(),
        createdAt: docSnap.data().creationTime,
        lastSignInTime: docSnap.data().lastSignInTime,
      },
    };
  } else {
    return { props: {} };
  }
};
//#引数context
//##params ... getStaticPathsからreturnされたroute parameters が入っている context.params = {username:"aa"} みたいな感じ
//##

// export const getStaticPaths: GetStaticPaths = async () => {
//   return {
//     paths: [{ params: { username: "aa" } }, { params: { username: "bb" } }],
//     fallback: false,
//   };
// };

//fallback: false → pathsに含まれないURLは404ページ
//fallback: true  → pathsに含まれないURLのリクエストが来る→fallbackページをレスポンス&裏でHTML/JSONを生成(getStaticPropsも実行)→次からはそのHTML/JSONを返す

//fallbackページの特徴：　ページのpropsは空 {},route.isFallbackがtrue...この情報でfallback用の動作が指定出来る
export default UserPage;
