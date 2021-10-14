import { useColorModeValue } from "@chakra-ui/color-mode";
import { Flex } from "@chakra-ui/layout";
import { useBreakpointValue } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import useIsMobile from "../../hooks/useIsMobile";
import MySpinner from "../CommonComponents/MySpinner";
import { FinishedButton } from "./FinishedButton";
import { LiveInfomationType } from "./LiveType";

const LiveFooter = (props: LiveInfomationType) => {
  const { currentUser, isAuthChecking } = useCurrentUser();
  const bg = useColorModeValue("white", "gray.600");
  const videofixed = useBreakpointValue({ lg: "flex-start", xl: "center" });
  const isMobile = useIsMobile();
  const router = useRouter();
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
      <FinishedButton />
    </Flex>
  );
};

export default LiveFooter;
