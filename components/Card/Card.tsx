import {
  Text,
  Container,
  HStack,
  VStack,
  GridItem,
  Box,
} from "@chakra-ui/layout";
import React from "react";
import Image from "next/image";
import PersonIcon from "@material-ui/icons/Person";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import {
  Badge,
  BadgeProps,
  Heading,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { CardType } from "./CardType";
import Link from "next/link";
import CardTime from "./CardTime";

type Input = {
  property: CardType;
};

const Card = ({ property }: Input) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <GridItem>
      <Link href={`/live/${property.broadId}`} passHref>
        <Stack as="a" align="center" direction={{ base: "row", md: "column" }}>
          <Container
            m={0}
            w={{ base: 140, md: 200 }}
            maxWidth={{ base: 140, md: 200 }}
            h={100}
            rounded="10"
            bg="gray.200"
            position="relative"
            _hover={{ opacity: 0.6 }}
            animation="ease-in-out"
            transition="opacity 0.1s linear"
          >
            <Image
              src={property.imageUrl}
              alt={property.imageAlt}
              layout="fill"
              objectFit="cover"
            />
            <MyBadge>New</MyBadge>
          </Container>
          <VStack
            p={1}
            alignItems="left"
            w={{ base: "180px", md: "200px" }}
            // maxWidth={{ base: "180px", md: "200px" }}
            spacing={1}
          >
            <Text
              noOfLines={2}
              w="100%"
              fontWeight="normal"
              as="h3"
              lineHeight="tight"
              fontSize="sm"
              h={5}
              isTruncated
            >
              {property.title}
            </Text>
            {/* <Text
              fontWeight="normal"
              as="h3"
              lineHeight="tight"
              fontSize="sm"
              h={5}
              isTruncated
            >
              {property.user}
            </Text>
            <HStack opacity={0.5} h={5} spacing={1}>
              <PersonIcon style={{ fontSize: "16px" }} />
              <Heading variant="menuitem" as="h4" size="xs">
                {property.connections}
              </Heading>

              <CardTime createdAt={property.createdAt} />
            </HStack> */}
          </VStack>
        </Stack>
      </Link>
    </GridItem>
  );
};

const MyBadge = (props: BadgeProps) => {
  return (
    <Badge
      position="absolute"
      borderRadius="full"
      variant="outline"
      colorScheme="green"
      top="5%"
      left="5%"
      bg="blue.400"
      color="white"
      boxShadow={0}
      {...props}
    />
  );
};

export default Card;
