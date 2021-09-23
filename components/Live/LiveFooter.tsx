import { useColorModeValue } from "@chakra-ui/color-mode";
import { Box, Center, Flex } from "@chakra-ui/layout";
import { Button, useBreakpointValue } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/spinner";
import { setDoc } from "@firebase/firestore";
import { doc } from "firebase/firestore";
import { useRouter } from "next/router";
import React from "react";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { db } from "../../src/lib/firebase";
import MySpinner from "../CommonComponents/MySpinner";
import { LiveInfomationType } from "./LiveType";

const LiveFooter = (props: LiveInfomationType) => {
  const { currentUser, isAuthChecking } = useCurrentUser();
  const bg = useColorModeValue("white", "gray.600");
  const videofixed = useBreakpointValue({ lg: "flex-start", xl: "center" });
  const router = useRouter();
  if (currentUser?.uid !== props.uid) return <></>; //放送者以外には何も表示しない
  if (isAuthChecking) return <MySpinner />; //Loading中

  const onFinished = async () => {
    await setDoc(
      doc(db, `broads/${router.query.live}`),
      {
        isNow: false,
      },
      { merge: true }
    );
  };
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
        <Button
          colorScheme="red"
          variant="solid"
          _focus={{}}
          onClick={onFinished}
        >
          放送終了
        </Button>
      </Box>
    </Flex>
  );
};

export default LiveFooter;
