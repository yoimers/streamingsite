import { Box, Center, Grid, Text } from "@chakra-ui/react";
import moment from "moment";
import type { NextPage } from "next";
import React from "react";
import Card from "../components/Card/Card";
import CardList from "../components/Card/CardList";
import { Layout } from "../components/Layout";

const properties = [
  {
    broadId: 1,
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
  },
  {
    broadId: 2,
    imageUrl: "/img.png",
    imageAlt: "放送用サムネイル",
    title: "放送タイトル２！",
    user: "useあああああr",
    createdAt: moment("2021-09-17 17:37:00"),
    connections: 2,
    rating: 5,
    like: 40,
    dislike: 30,
  },
  {
    broadId: 3,
    imageUrl: "/img.png",
    imageAlt: "放送用サムネイル",
    title: "放送タイトル２！",
    user: "useあああああr",
    createdAt: moment("2021-09-17 17:37:00"),
    connections: 2,
    rating: 5,
    like: 40,
    dislike: 30,
  },
  {
    broadId: 4,
    imageUrl: "/img.png",
    imageAlt: "放送用サムネイル",
    title: "放送タイトル２！",
    user: "useあああああr",
    createdAt: moment("2021-09-17 17:37:00"),
    connections: 2,
    rating: 5,
    like: 40,
    dislike: 30,
  },
  {
    broadId: 6,
    imageUrl: "/img.png",
    imageAlt: "放送用サムネイル",
    title: "放送タイトル２！",
    user: "useあああああr",
    createdAt: moment("2021-09-17 17:37:00"),
    connections: 2,
    rating: 5,
    like: 40,
    dislike: 30,
  },
  {
    broadId: 7,
    imageUrl: "/img.png",
    imageAlt: "放送用サムネイル",
    title: "放送タイトル２！",
    user: "useあああああr",
    createdAt: moment("2021-09-17 17:37:00"),
    connections: 2,
    rating: 5,
    like: 40,
    dislike: 30,
  },
  {
    broadId: 8,
    imageUrl: "/img.png",
    imageAlt: "放送用サムネイル",
    title: "放送タイトル２！",
    user: "useあああああr",
    createdAt: moment("2021-09-17 17:37:00"),
    connections: 2,
    rating: 5,
    like: 40,
    dislike: 30,
  },
];

const Home: NextPage = () => {
  return (
    <Layout title="Wavelet">
      <CardList properties={properties} title="オススメのライブ" />
      <CardList properties={properties} title="最新のライブ" />
    </Layout>
  );
};

export default Home;
