import { doc, getDoc } from "firebase/firestore";
import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { Layout } from "../../components/Layout";
import Live from "../../components/Live/Live";
import { db } from "../../src/lib/firebase";

const LivePage: NextPage = (props) => {
  return (
    <Layout title={`Wavelet ${"タイトル書く"}`}>
      <Live {...(props as any)} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  if (!params) return { props: {} };
  const commentref = doc(db, `broads/${params.live}`);
  const docSnap = await getDoc(commentref);
  if (docSnap.exists()) {
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
