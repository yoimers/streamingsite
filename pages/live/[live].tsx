import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Layout } from "../../components/Layout";
import Live from "../../components/Live/Live";
import { db } from "../../src/lib/firebase";

const LivePage: NextPage = (props: any) => {
  const router = useRouter();
  if (!props.isNow) router.push("/");
  useEffect(() => {
    const unsub = onSnapshot(doc(db, `broads/${router.query.live}`), (doc) => {
      if (!doc.data()?.isNow) router.push("/");
    });
    return unsub;
  }, [router, router.query.live]);
  return (
    <Layout title={`Wavelet ${"タイトル書く"}`}>
      <Live {...props} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  if (!params) return { props: {} };
  const commentref = doc(db, `broads/${params.live}`);
  const docSnap = await getDoc(commentref);
  if (docSnap.exists() && docSnap.data().isNow) {
    return {
      props: {
        live: params?.live,
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt.seconds,
      },
    };
  } else {
    return { props: {} };
  }
};

// getServerSidePropsでは使えない

// export const getStaticPaths: GetStaticPaths = async () => {
//   return {
//     paths: [],
//     fallback: "blocking",
//   };
// };
export default LivePage;
