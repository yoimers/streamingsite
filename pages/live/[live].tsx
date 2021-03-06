import { doc, getDoc } from "firebase/firestore";
import {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from "next";
import React from "react";
import { Layout } from "../../components/Layout";
import Live from "../../components/Live/Live";
import ReturnModal from "../../components/Live/ReturnModal";
import useIsBroadCast from "../../hooks/useIsBroadCast";
import { db } from "../../src/lib/firebase";

const LivePage: NextPage = (props: any) => {
  const { isNow } = useIsBroadCast();
  return (
    <Layout title={`Wavelet ${props.title}`}>
      {isNow ? <Live {...props} /> : <ReturnModal />}
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  if (!params) return { props: {}, revalidate: 10 };

  const docSnap = await getDoc(doc(db, `broads/${params.live}`));
  if (docSnap.exists() && docSnap.data().isNow) {
    const data = docSnap.data();
    delete data.timeStamp;
    return {
      props: {
        live: params?.live,
        ...data,
        createdAt: data.createdAt.seconds,
      },
      revalidate: 10,
    };
  } else {
    return { props: {}, revalidate: 10 };
  }
};

export default LivePage;
