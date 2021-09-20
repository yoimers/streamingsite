import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { Layout } from "../../components/Layout";
import Live from "../../components/Live/Live";

const LivePage: NextPage = () => {
  const router = useRouter();
  return (
    <Layout title={`Wavelet ${"タイトル書く"}`}>
      <Live />
    </Layout>
  );
};

export default LivePage;
