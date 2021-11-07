import {
  Box,
  Button,
  Flex,
  Spacer,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import {
  collection,
  DocumentData,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
} from "firebase/firestore";
import type { GetStaticProps, NextPage } from "next";
import useSWR from "swr";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CardList from "../components/Card/CardList";
import { CardType } from "../components/Card/CardType";
import Footer from "../components/Footer/Footer";
import { Layout } from "../components/Layout";
import { db } from "../src/lib/firebase";
import { getBroadLists } from "../src/lib/getBroadLists";
import PopularCards from "../components/Card/PopularCards";

const Home: NextPage = (props) => {
  const { cards }: any = props;
  const [properties, setProperties] = useState<CardType[]>(cards || []);
  const [popular, setPopular] = useState<CardType[]>([]);
  useEffect(() => {
    getBroadLists(4).then(({ cards }) => setProperties(cards));
  }, []);

  useEffect(() => {
    setPopular(properties.slice(0, 4));
  }, [properties]);
  return (
    <Layout title="Wavelet">
      <Flex flexDirection="column" h="100%">
        <VStack h={{ base: "auto", md: "280px" }}>
          <PopularCards
            properties={popular}
            setProperties={setProperties}
            effect="coverflow"
            title="現在人気のライブ"
          />
        </VStack>
        <VStack h={{ base: "auto", md: "280px" }}>
          <CardList
            properties={properties}
            setProperties={setProperties}
            title="オススメのライブ"
          />
        </VStack>
        <Spacer />
        <Footer />
      </Flex>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // const { cards } = await getBroadLists(4);
  return {
    props: {
      // cards,
      // lastCard,
      // fallback: {
      //   "/api/broads": cards,
      // },
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
