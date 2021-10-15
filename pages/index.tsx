import { Box, Flex, Spacer, VStack } from "@chakra-ui/react";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CardList from "../components/Card/CardList";
import { CardType } from "../components/Card/CardType";
import Footer from "../components/Footer/Footer";
import { Layout } from "../components/Layout";
import { getBroadLists } from "../src/lib/getBroadLists";

const Home: NextPage = (props) => {
  const { cards }: any = props;
  const [properties, setProperties] = useState<CardType[]>(cards);
  return (
    <Layout title="Wavelet">
      <Flex flexDirection="column" h="100%">
        <VStack>
          <CardList properties={properties} title="オススメのライブ" />
        </VStack>
        <Spacer />
        <Footer />
      </Flex>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const cards = await getBroadLists();
  return {
    props: {
      cards,
    },
    revalidate: 10,
  };
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const querySnapshot = await getBroadLists();
//   const cards: CardType[] = [];

//   querySnapshot.forEach((doc) => {
//     const data = toData(doc);
//     cards.push({ ...data });
//   });
//   return { props: { cards } };
// };

export default Home;
