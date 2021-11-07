import { Text, useBreakpointValue, Box, Flex, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import Card from "./Card";
import { CardType } from "./CardType";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import SwiperCore, { Pagination, Navigation, EffectCoverflow } from "swiper";
import { getBroadLists } from "../../src/lib/getBroadLists";
SwiperCore.use([Pagination, Navigation, EffectCoverflow]);
type Input = {
  properties: CardType[];
  title: string;
  setProperties: React.Dispatch<React.SetStateAction<CardType[]>>;
  effect?:
    | "slide"
    | "fade"
    | "cube"
    | "coverflow"
    | "flip"
    | "creative"
    | "cards";
};
const getNum = 4;
const PopularCards = ({ properties, title, setProperties, effect }: Input) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [hasMore, setHasMore] = useState(true);
  const slidesPerView = useBreakpointValue({
    base: 3,
    md: 3,
    lg: 4,
  });
  const isSize = properties.length < (slidesPerView || 4);
  const getCards = async () => {
    const last = properties[properties.length - 1].timeStamp;
    const { cards } = await getBroadLists(getNum, last);
    setProperties((prev) => [...prev, ...cards]);
    if (cards.length < getNum) setHasMore(false);
  };
  return (
    <Box w={{ base: "100%", md: "80%" }} p={4} mx="auto">
      <Text
        noOfLines={isMobile ? 1 : 2}
        as="h2"
        ml={2}
        fontWeight="bold"
        fontSize="md"
        lineHeight="tight"
        letterSpacing="wider"
      >
        {title}
      </Text>
      <Flex
        pt="10px"
        w="100%"
        maxW={{ md: "670px", lg: "890px" }}
        minW={{ md: "670px", lg: "890px" }}
        flexDirection={{ base: "column", md: "row" }}
      >
        {isMobile || isSize ? (
          <>
            {properties.map((property) => (
              <Card property={property} key={property.broadId} />
            ))}
          </>
        ) : (
          <Swiper
            slidesPerView={slidesPerView}
            spaceBetween={1}
            slidesPerGroup={1}
            loopFillGroupWithBlank={true}
            navigation={true}
            className={`mySwiper`}
            effect={effect || "slide"}
            centeredSlides={!!effect}
            loop={!!effect}
            coverflowEffect={{
              rotate: 0,
              stretch: 10,
              depth: 200,
              modifier: 1,
            }}
          >
            {properties.map((property, index) => (
              <SwiperSlide key={property.broadId}>
                <Card property={property} badge={index} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </Flex>
    </Box>
  );
};

export default PopularCards;
