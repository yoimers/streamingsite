import { VStack } from "@chakra-ui/react";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import CardList from "../components/Card/CardList";
import { CardType } from "../components/Card/CardType";
import { Layout } from "../components/Layout";
import { getBroadLists } from "../src/lib/getBroadLists";

const Home: NextPage = (props) => {
  const router = useRouter();
  const { cards }: any = props;
  const [properties, setProperties] = useState<CardType[]>(cards);
  return (
    <Layout title="Wavelet">
      <VStack height="calc(100% - 60px)" pb="50px">
        <CardList properties={properties} title="オススメのライブ" />
      </VStack>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const querySnapshot = await getBroadLists();
  const cards: CardType[] = [];

  querySnapshot.forEach((doc) => {
    const data = toData(doc);
    cards.push({ ...data });
  });
  return { props: { cards } };
};

const toData = (doc: QueryDocumentSnapshot<DocumentData>): any => {
  const data = doc.data();
  return {
    ...data,
    broadId: doc.id,
    createdAt: data.createdAt.seconds,
  };
};

export default Home;
