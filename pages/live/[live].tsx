import { doc, getDoc } from "firebase/firestore";
import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { Layout } from "../../components/Layout";
import Live from "../../components/Live/Live";
import ReturnModal from "../../components/Live/ReturnModal";
import CommonVideo from "../../components/Live/Video/CommonVideo";
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
