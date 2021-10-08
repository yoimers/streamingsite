import { VStack } from "@chakra-ui/react";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import type { GetStaticProps, NextPage } from "next";
import React, { useEffect, useState } from "react";
import CardList from "../components/Card/CardList";
import { CardType } from "../components/Card/CardType";
import { Layout } from "../components/Layout";
import { getBroadLists } from "../src/lib/getBroadLists";

const Home: NextPage = (props) => {
  const { cards }: any = props;
  const [properties, setProperties] = useState<CardType[]>(cards);
  // const a = [...cards, ...cards, ...cards, ...cards, ...cards];
  // const b = [...a, ...a, ...a];
  // setProperties(b);
  return (
    <Layout title="Wavelet">
      <VStack height="calc(100% - 60px)" pb="50px">
        <CardList properties={properties} title="オススメのライブ" />
      </VStack>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
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
