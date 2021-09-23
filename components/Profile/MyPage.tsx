import { Box, Center, Flex, Spacer } from "@chakra-ui/layout";
import {
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  Heading,
  IconButton,
  Stack,
  Textarea,
  useBreakpointValue,
  useColorModeValue,
  useEditableControls,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { doc, setDoc } from "@firebase/firestore";
import { db } from "../../src/lib/firebase";
import Link from "next/link";
import { useRouter } from "next/router";
import Profile from "./Profile";

type Input = {
  isMyPage: boolean;
  [key: string]: any;
};

const MyPage = ({ isMyPage, ...props }: Input) => {
  return <Profile isMyPage={isMyPage} {...props} />;
};
export default MyPage;
