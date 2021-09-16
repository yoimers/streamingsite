import { Heading, HStack, Input, Stack, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import Link from "next/link";
import React from "react";
import { Layout } from "../components/Layout";
import { SignInOutTriger } from "../src/lib/SignInOutTriger";

const Home: NextPage = () => {
  return (
    <Layout title="Wavelet">
      <SignInOutTriger
        SignIn={<p>SignIn</p>}
        SignOut={<p>SignOut</p>}
        Loading={<p>Loading</p>}
      />
      a
    </Layout>
  );
};

export default Home;
