import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Layout } from "../../components/Layout";
import Live from "../../components/Live/Live";
import ReturnModal from "../../components/Live/ReturnModal";
import useIsBroadCast from "../../hooks/useIsBroadCast";
import { db, storage } from "../../src/lib/firebase";

const LivePage: NextPage = (props: any) => {
  const { isNow } = useIsBroadCast();
  return (
    <Layout title={`Wavelet ${"タイトル書く"}`}>
      {isNow ? <Live {...props} /> : <ReturnModal />}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  if (!params) return { props: {} };

  const docSnap = await getDoc(doc(db, `broads/${params.live}`));
  if (docSnap.exists() && docSnap.data().isNow) {
    const data = docSnap.data();
    return {
      props: {
        live: params?.live,
        ...data,
        createdAt: data.createdAt.seconds,
      },
    };
  } else {
    return { props: {} };
  }
};

export default LivePage;
