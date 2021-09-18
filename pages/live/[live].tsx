import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { Layout } from "../../components/Layout";

const Page: NextPage = () => {
  const router = useRouter();
  return <Layout title="Wavelet livepage">{router.query.live}</Layout>;
};

export default Page;
