import { Box, Center, Flex, Spacer } from "@chakra-ui/layout";
import {
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  Heading,
  HStack,
  IconButton,
  Stack,
  useBreakpointValue,
  useColorModeValue,
  useEditableControls,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Image from "next/image";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import { doc, setDoc } from "@firebase/firestore";
import { db } from "../../src/lib/firebase";
import { useSetRecoilState } from "recoil";
import { currentUserState } from "../../states/currentUser";

type Input = {
  isMyPage: boolean;
  [key: string]: any;
};
const MyPage = ({ isMyPage, ...props }: Input) => {
  const {
    uid,
    createdAt,
    lastSginInTime,
    displayName,
    email,
    photoURL,
    profile,
  } = props;
  const px = useBreakpointValue({ base: 0, md: 10 });
  const w = useBreakpointValue({ base: "100%", md: "600px" });
  const bg = useColorModeValue("brand.backgroundcolor2", "gray.900");
  const [data, setData] = useState({
    name: displayName ? displayName : "",
    profile: profile ? profile : "",
  });
  const setCurrentUser = useSetRecoilState(currentUserState);
  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton
          icon={<CheckIcon />}
          aria-label="check"
          {...getSubmitButtonProps()}
        />
        <IconButton
          icon={<CloseIcon />}
          aria-label="close"
          {...getCancelButtonProps()}
        />
      </ButtonGroup>
    ) : (
      <></>
    );
  }
  const onSubmit = (value: string, name: "displayName" | "profile"): void => {
    const userRef = doc(db, `users/${uid}`);
    (async () => {
      //存在しない→作成、存在する→上書き
      await setDoc(
        userRef,
        {
          [name]: value,
        },
        { merge: true }
      );
      if (name === "displayName") {
        setCurrentUser((currVal) => {
          if (currVal == null) return null;
          return { ...currVal, displayName: value };
        });
      }
    })();
  };
  return (
    <Flex px={px} py={5} mt={20} mx="auto" w={w} bg={bg} rounded={10}>
      <Box
        as="button"
        height="100px"
        width="100px"
        position="relative"
        rounded="full"
        top={0}
        outlineOffset={0}
        _active={{ boxShadow: "outline" }}
        _focus={{}}
      >
        <Image
          src={photoURL}
          height="100px"
          width="100px"
          alt="プロフィール画像"
          layout="fixed"
        />
      </Box>
      <Stack w="100%">
        <Heading size="sm">
          <Editable
            textAlign="left"
            fontSize="2xl"
            w="100%"
            placeholder="名前を入力してください"
            defaultValue={data.name}
            submitOnBlur={false}
            onSubmit={(value: string) => onSubmit(value, "displayName")}
          >
            <Flex alignItems="center" justifyContent="space-between">
              <EditablePreview pl={2} />
              <EditableInput w="80%" pl={2} />
              <EditableControls />
            </Flex>
          </Editable>
        </Heading>

        <Editable
          textAlign="left"
          fontSize="md"
          mr="50px"
          w="100%"
          placeholder="自己紹介文を書いてください"
          defaultValue={data.profile}
          submitOnBlur={false}
          onSubmit={(value: string) => onSubmit(value, "profile")}
        >
          <Flex alignItems="center" justifyContent="space-between">
            <EditablePreview pl={2} />
            <EditableInput w="80%" pl={2} />
            <EditableControls />
          </Flex>
        </Editable>
      </Stack>
    </Flex>
  );
};

export default MyPage;
