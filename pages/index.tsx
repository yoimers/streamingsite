import { Box, Center, Grid, Text, VStack } from "@chakra-ui/react";
import moment from "moment";
import type { NextPage } from "next";
import React from "react";
import Card from "../components/Card/Card";
import CardList from "../components/Card/CardList";
import { CardType } from "../components/Card/CardType";
import { Layout } from "../components/Layout";

const properties: CardType[] = [
  {
    broadId: "98CwC1mIS2mIt5F6d2D4",
    imageUrl: "/img.png",
    imageAlt: "放送用サムネイル",
    title:
      "aaaaaaaaaaaaaaaaafefegrggsgaaegeaaaaaaaaaaaaaaaaafefegrggsgaaegeaaaaaaaaaaaaaaaaafefegrggsgaaegeaaaaaaaaaaaaaaaaafefegrggsgaaegeaaaaaaaaaaaaaaaaafefegrggsgaaegeaaaaaaaaaaaaaaaaafefegrggsgaaegeaaaaaaaaaaaaaaaaafefegrggsgaaegeaaaaaaaaaaaaaaaaafefegrggsgaaegeaaaaaaaaaaaaaaaaafefegrggsgaaegeaaaaaaaaaaaaaaaaafefegrggsgaaegeaaaaaaaaaaaaaaaaafefegrggsgaaegeaaaaaaaaaaaaaaaaafefegrggsgaaegeaaaaaaaaaaaaaaaaafefegrggsgaaegeaaaaaaaaaaaaaaaaafefegrggsgaaegeaaaaaaaaaaaaaaaaafefegrggsgaaegeaaaaaaaaaaaaaaaaafefegrggsgaaegeaaaaaaaaaaaaaaaaafefegrggsgaaegeaaaaaaaaaaaaaaaaafefegrggsgaaegeaaaaaaaaaaaaaaaaafefegrggsgaaegeaaaaaaaaaaaaaaaaafefegrggsgaaegeaaaaaaaaaaaaaaaaafefegrggsgaaegeaaaaaaaaaaaaaaaaafefegrggsgaaegeaaaaaaaaaaaaaaaaaaa",
    user: "user ユーザー",
    createdAt: moment("2021-09-17 17:00:00"),
    connections: 20,
    rating: 4,
    like: 10,
    dislike: 5,
    isNow: true,
  },
  {
    broadId: "98CwC1mIS2mIt5F6d2D4b",
    imageUrl: "/img.png",
    imageAlt: "放送用サムネイル",
    title: "放送タイトル２！",
    user: "useあああああr",
    createdAt: moment("2021-09-17 17:37:00"),
    connections: 2,
    rating: 5,
    like: 40,
    dislike: 30,
    isNow: true,
  },
  {
    broadId: "98CwC1mIS2mIt5F6xd2D4b",
    imageUrl: "/img.png",
    imageAlt: "放送用サムネイル",
    title: "放送タイトル２！",
    user: "useあああああr",
    createdAt: moment("2021-09-17 17:37:00"),
    connections: 2,
    rating: 5,
    like: 40,
    dislike: 30,
    isNow: true,
  },
  {
    broadId: "98CwC1mIS2mIt5F6d2aD4",
    imageUrl: "/img.png",
    imageAlt: "放送用サムネイル",
    title: "放送タイトル２！",
    user: "useあああああr",
    createdAt: moment("2021-09-17 17:37:00"),
    connections: 2,
    rating: 5,
    like: 40,
    dislike: 30,
    isNow: true,
  },
  {
    broadId: "98CwC1mIS2mIt5aF6d2D4",
    imageUrl: "/img.png",
    imageAlt: "放送用サムネイル",
    title: "放送タイトル２！",
    user: "useあああああr",
    createdAt: moment("2021-09-17 17:37:00"),
    connections: 2,
    rating: 5,
    like: 40,
    dislike: 30,
    isNow: true,
  },
  {
    broadId: "98CwC1mIS2mIt5wF6d2D4",
    imageUrl: "/img.png",
    imageAlt: "放送用サムネイル",
    title: "放送タイトル２！",
    user: "useあああああr",
    createdAt: moment("2021-09-17 17:37:00"),
    connections: 2,
    rating: 5,
    like: 40,
    dislike: 30,
    isNow: true,
  },
  {
    broadId: "98CwC1mIS2mIt5F6dx2D4",
    imageUrl: "/img.png",
    imageAlt: "放送用サムネイル",
    title: "放送タイトル２！",
    user: "useあああああr",
    createdAt: moment("2021-09-17 17:37:00"),
    connections: 2,
    rating: 5,
    like: 40,
    dislike: 30,
    isNow: true,
  },
];

const Home: NextPage = () => {
  return (
    <Layout title="Wavelet">
      <VStack height="calc(100% - 60px)" pb="50px">
        <CardList properties={properties} title="オススメのライブ" />
        <CardList properties={properties} title="最新のライブ" />
      </VStack>
    </Layout>
  );
};

export default Home;
