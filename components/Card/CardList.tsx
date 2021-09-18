import { Text, Grid, useBreakpointValue, Box } from "@chakra-ui/react";
import React from "react";
import Card from "./Card";
import { CardType } from "./CardType";

type Input = {
  properties: CardType[];
  title: string;
};
const CardList = ({ properties, title }: Input) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <Box w={{ base: "100%", md: "auto" }} p={4}>
      <Text
        noOfLines={isMobile ? 1 : 2}
        as="h2"
        fontWeight="bold"
        fontSize="md"
        lineHeight="tight"
        letterSpacing="wider"
      >
        {title}
      </Text>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
          xl: "repeat(5, 1fr)",
          "2xl": "repeat(6, 1fr)",
        }}
        gap={4}
        pt="20px"
        width={isMobile ? "100%" : undefined}
      >
        {properties.map((property) => (
          <Card property={property} key={property.broadId} />
        ))}
      </Grid>
    </Box>
  );
};

export default CardList;
