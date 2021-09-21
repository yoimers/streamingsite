import { useColorModeValue } from "@chakra-ui/color-mode";
import { Box, Center, Flex } from "@chakra-ui/layout";
import { useBreakpointValue } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/spinner";
import React from "react";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import MySpinner from "../CommonComponents/MySpinner";
import { LiveInfomationType } from "./LiveType";

const LiveFooter = (props: LiveInfomationType) => {
  const { currentUser, isAuthChecking } = useCurrentUser();
  const bg = useColorModeValue("white", "gray.600");
  const videofixed = useBreakpointValue({ lg: "flex-start", xl: "center" });

  if (currentUser?.uid !== props.uid) return <></>; //放送者以外には何も表示しない
  if (isAuthChecking) return <MySpinner />; //Loading中
  return (
    <Flex justifyContent={videofixed}>
      <Box
        bg={bg}
        rounded={10}
        p={2}
        mt={8}
        w="100%"
        minWidth="992px"
        maxW="1351px"
      >
        以下は放送者のみが閲覧出来ます。
      </Box>
    </Flex>
  );
};

export default LiveFooter;
