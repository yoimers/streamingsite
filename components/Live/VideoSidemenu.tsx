import {
  AspectRatio,
  Box,
  Center,
  Flex,
  HStack,
  VStack,
} from "@chakra-ui/layout";
import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { ReactElement, useRef } from "react";
import useIsMobile from "../../hooks/useIsMobile";
import Commentcomp from "./CommentForm";
import CommentList from "./CommentList";
import CommentTab from "./CommentTab";
import { CommentType } from "./LiveType";

const VideoSidemenu = () => {
  const bg = useColorModeValue("brand.backgroundcolor2", "gray.600");
  const isMobile = useIsMobile();
  return (
    <Box
      bg={bg}
      mt={{ base: 2, md: 0 }}
      h={{ base: "100%", md: "auto" }}
      w={{ base: "100%", md: "80%" }}
      minWidth="290px"
      maxWidth={{ base: "100%", md: "320px" }}
      roundedRight={10}
      roundedLeft={{ base: 10, md: 0 }}
    >
      <Tabs id="tabtabtab" h="calc(100% - 40px)">
        <TabList
          bg={bg}
          justifyContent="space-around"
          color="brand.mygray1"
          roundedRight={10}
          roundedLeft={{ base: 10, md: 0 }}
          boxShadow="none"
        >
          <MyTab roundedTopLeft={{ base: 10, md: 0 }}>コメント</MyTab>
          <MyTab>何か１</MyTab>
          <MyTab roundedTopRight={10}>何か２</MyTab>
        </TabList>

        <TabPanels h="100%" position="relative">
          <TabPanel p={0} pt={1} position="absolute" w="100%" h="100%">
            <CommentTab />
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

type TabInput = {
  children: string;
  [rest: string]: any;
};
const MyTab = ({ children, ...rest }: TabInput) => {
  const tabcolor = useColorModeValue("brand.maincolor", "white"); //"blue.300"
  const selectedbg = useColorModeValue("brand.backgroundcolor2", "gray.600");
  const bg = useColorModeValue("gray.300", "gray.900");
  return (
    <Tab
      _active={{}}
      _focus={{}}
      _selected={{
        color: tabcolor,
        borderBottomColor: tabcolor,
        bg: selectedbg,
      }}
      fontSize={16}
      fontWeight="semibold"
      letterSpacing="0.16px"
      w="100%"
      h="100%"
      bg={bg}
      pt={2}
      {...rest}
    >
      {children}
    </Tab>
  );
};
export default VideoSidemenu;
