import { GetServerSideProps, GetStaticPaths, NextPage } from "next";
import React from "react";
import { Layout } from "../../components/Layout";
import Live from "../../components/Live/Live";

const LivePage: NextPage = () => {
  return (
    <Layout title={`Wavelet ${"タイトル書く"}`}>
      <Live />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log(context);
  return {
    props: {}, // will be passed to the page component as props
  };
};

// export const getStaticPaths: GetStaticPaths = async () => {
//   return {
//     paths: [],
//     fallback: "blocking",
//   };
// };
export default LivePage;
