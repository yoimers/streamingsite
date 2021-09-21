import { VStack } from "@chakra-ui/react";
import {
  collection,
  DocumentData,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  where,
} from "firebase/firestore";
import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CardList from "../components/Card/CardList";
import { CardType } from "../components/Card/CardType";
import { Layout } from "../components/Layout";
import { db } from "../src/lib/firebase";

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
  const commentref = collection(db, `broads`);
  const q = query(
    commentref,
    where("isNow", "==", true),
    orderBy("createdAt", "desc"),
    limit(10)
  );
  const cards: CardType[] = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    cards.push(toData(doc));
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
