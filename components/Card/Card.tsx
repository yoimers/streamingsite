import { Text, Container, HStack, VStack, Box } from "@chakra-ui/layout";
import React from "react";
import Image from "next/image";
import PersonIcon from "@material-ui/icons/Person";
import styles from "../Layout.module.css";
import {
  Badge,
  BadgeProps,
  Heading,
  Stack,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { CardType } from "./CardType";
import Link from "next/link";
import CardTime from "./CardTime";
import cardstyles from "./Cards.module.css";

type Input = {
  property: CardType;
  badge?: "new" | 0 | 1 | 2 | 3 | number;
};

const Card = ({ property, badge = "new" }: Input) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const bg = useColorModeValue("brand.backgroundcolor2", "gray.900");

  return (
    <Box
      bg={bg}
      rounded={10}
      p={1}
      my={1}
      mx={2}
      minW={isMobile ? undefined : "210px"}
      maxW={isMobile ? undefined : "210px"}
      _hover={{
        transform: isMobile ? "scale(1.01)" : "scale(1.04)",
        transitionDuration: "0.2s",
      }}
    >
      <Link href={`/live/${property.broadId}`} prefetch={false} passHref>
        <Stack as="a" align="center" direction={{ base: "row", md: "column" }}>
          <Container
            m={0}
            w={{ base: 140, md: 200 }}
            maxWidth={{ base: 140, md: 200 }}
            h={100}
            rounded="10"
            bg="gray.200"
            position="relative"
            // _hover={{ opacity: 0.6 }}
            animation="ease-in-out"
            transition="opacity 0.1s linear"
          >
            <Image
              src={property.imageUrl}
              alt="動画用のサムネイル"
              layout="fill"
              objectFit="cover"
              className={styles.broadimage}
            />
            <MyBadge badge={badge} />
          </Container>
          <VStack
            p={1}
            alignItems="left"
            w={{ base: "calc(100vw - 300px)", md: "200px" }}
            minWidth={{ base: "150px", md: "200px" }}
            maxWidth={{ base: "400px", md: "200px" }}
            spacing={1}
          >
            <Text
              noOfLines={2}
              fontWeight="normal"
              as="h3"
              lineHeight="tight"
              fontSize="sm"
            >
              {property.title}
            </Text>
            <Text
              fontWeight="normal"
              as="h3"
              lineHeight="tight"
              fontSize="sm"
              h={5}
              isTruncated
            >
              {property.displayName}
            </Text>
            <HStack opacity={0.5} h={5} spacing={1}>
              {property.connections && (
                <>
                  <PersonIcon style={{ fontSize: "16px" }} />
                  <Heading variant="menuitem" as="h4" size="xs" mr={2}>
                    {property.connections}
                  </Heading>
                </>
              )}

              <CardTime
                createdAt={
                  typeof property.createdAt === "number"
                    ? property.createdAt
                    : property.createdAt.seconds
                }
              />
            </HStack>
          </VStack>
        </Stack>
      </Link>
    </Box>
  );
};

type MyBadgeType = {
  badge: Input["badge"];
  rest?: BadgeProps;
};
const MyBadge = ({ badge, ...rest }: MyBadgeType) => {
  switch (badge) {
    case "new":
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
          {...rest}
        />
      );
    case 0:
      return <></>;
    case 1:
      return <></>;
    case 2:
      return <></>;
    default:
      return <></>;
  }
};

export default Card;
