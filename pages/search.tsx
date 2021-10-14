import { Flex, VStack, Spacer } from "@chakra-ui/layout";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CardList from "../components/Card/CardList";
import { CardType } from "../components/Card/CardType";
import Footer from "../components/Footer/Footer";
import { Layout } from "../components/Layout";
import NoMatch from "../components/Live/NoMatch";
import { index } from "../src/algolia/algolia";

const Search: NextPage = () => {
  const [properties, setProperties] = useState<CardType[]>([]);
  const router = useRouter();
  const query = router.query.search as any;
  useEffect(() => {
    if (typeof query !== "string") {
      router.push("/");
      return;
    }
    index
      .search(query, {
        attributesToRetrieve: [
          "objectID",
          "title",
          "content",
          "displayName",
          "createdAt",
          "imageUrl",
          "photoURL",
          "uid",
          "isNow",
          "searchable(isNow)",
        ],
        hitsPerPage: 50,
        filters: "isNow:true",
      })
      .then(({ hits }: any) => {
        const data = hits.map((hit: any) => ({
          ...hit,
          broadId: hit.objectID,
          createdAt: Math.floor(hit.createdAt / 1000),
        }));
        console.log(data);
        setProperties(data);
      });
  }, [query, router]);
  return (
    <Layout title="Wavelet">
      <Flex flexDirection="column" h="100%">
        <VStack>
          {properties.length === 0 ? (
            <NoMatch query={query} />
          ) : (
            <CardList
              properties={properties}
              title={`検索結果 ${properties.length}件 : ${query}`}
            />
          )}
        </VStack>
        <Spacer />
        <Footer />
      </Flex>
    </Layout>
  );
};

export default Search;
