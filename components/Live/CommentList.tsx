import { Box, Center, HStack, Text } from "@chakra-ui/layout";
import { Tooltip } from "@chakra-ui/tooltip";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { db } from "../../src/lib/firebase";
import { CommentType } from "./LiveType";

type Input = {
  comment: CommentType;
};
const CommentList = ({ comment }: Input) => {
  return (
    <Tooltip label={`${comment.content}`} placement="top-start">
      <HStack mt={0.5} spacing={0}>
        <Text px={2} fontSize="xs" color="gray.400">
          {comment.displayName}
        </Text>
        <Text fontSize="sm">{comment.content}</Text>
      </HStack>
    </Tooltip>
  );
};

export default CommentList;
