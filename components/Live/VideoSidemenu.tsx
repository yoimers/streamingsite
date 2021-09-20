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
import Commentcomp from "./CommentForm";
import CommentList from "./CommentList";
import CommentTab from "./CommentTab";
import { CommentType } from "./LiveType";

const VideoSidemenu = () => {
  const bg = useColorModeValue("white", "gray.600");
  return (
    <Box bg={bg} w="320px" minWidth="320px" roundedRight={10}>
      <Tabs id="tabtabtab" h="100%">
        <TabList justifyContent="space-around" color="brand.mygray1">
          <MyTab>コメント</MyTab>
          <MyTab>何か１</MyTab>
          <MyTab roundedTopRight={10}>何か２</MyTab>
        </TabList>

        <TabPanels h="100%" position="relative">
          <TabPanel
            p={0}
            pt={1}
            position="absolute"
            w="100%"
            h="calc(100% - 42px)"
            // overflow="auto"
          >
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
  const selectedbg = useColorModeValue("white", "gray.600");
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
