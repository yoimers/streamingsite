import { useColorModeValue } from "@chakra-ui/color-mode";
import { Flex, Spacer } from "@chakra-ui/layout";
import { Box, Button, ButtonGroup, useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import { CgMediaPodcast } from "react-icons/cg";
import { FaQuestionCircle } from "react-icons/fa";
import { useRecoilValue } from "recoil";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { broadCastMedia } from "../../states/broadCastMedia";
import MySpinner from "../CommonComponents/MySpinner";
import { DiscriptionOBS } from "./DiscriptionOBS";
import { FinishedButton } from "./FinishedButton";
import { LiveInfomationType } from "./LiveType";

const LiveFooter = (props: LiveInfomationType) => {
  const { currentUser, isAuthChecking } = useCurrentUser();
  const MediaState = useRecoilValue(broadCastMedia);
  const bg = useColorModeValue("white", "gray.600");
  const videofixed = useBreakpointValue({ lg: "flex-start", xl: "center" });
  if (currentUser?.uid !== props.uid) return <></>; //放送者以外には何も表示しない
  if (isAuthChecking) return <MySpinner />; //Loading中

  return (
    <Flex
      justifyContent={videofixed}
      bg={bg}
      rounded={10}
      p={2}
      mt={8}
      w="100%"
    >
      <ButtonGroup size="md" isAttached colorScheme="blue">
        <Button
          borderRight="2px"
          borderColor="blue.300"
          _focus={{}}
          _active={{}}
          onClick={MediaState}
          leftIcon={<CgMediaPodcast size="24px" />}
        >
          反映する
        </Button>
        <DiscriptionOBS />
      </ButtonGroup>
      <Spacer />
      <FinishedButton />
    </Flex>
  );
};

export default LiveFooter;
