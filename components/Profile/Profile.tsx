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
import useScrollbar from "../../hooks/useScrollbar";

type Input = {
  isMyPage: boolean;
  [key: string]: any;
};

const Profile = ({ isMyPage, ...props }: Input) => {
  const w = useBreakpointValue({ base: "90%", md: "600px" });
  const bg = useColorModeValue("brand.backgroundcolor2", "gray.900");
  const [profile, setProfile] = useState(props.profile || "");
  const [name, setName] = useState(props.displayName || "");
  const scrollstyle = useScrollbar();
  const router = useRouter();
  useEffect(() => {
    setProfile(props.profile);
    setName(props.displayName);
  }, [props.displayName, props.profile, router.query.uid]);
  const onSubmit = (value: string, name: "displayName" | "profile"): void => {
    const userRef = doc(db, `users/${props.uid}`);
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
        document.title = `Wavelet ${value}`;
      }
    })();
  };
  return (
    <Flex px={6} py={5} mt={20} mx="auto" w={w} bg={bg} rounded={10}>
      <Box
        as="button"
        height="100px"
        width="100px"
        position="relative"
        _active={{ boxShadow: "outline" }}
        _focus={{}}
      >
        {props.photoURL && (
          <Image
            src={props.photoURL}
            width="100px"
            height="100px"
            layout="fixed"
            alt="プロフィール画像"
          />
        )}
      </Box>
      <Stack w="100%" ml={2}>
        <Heading size="sm">
          <Editable
            textAlign="left"
            fontSize="2xl"
            w="100%"
            placeholder={props.displayName || "名前を入力してください"}
            submitOnBlur={false}
            value={name}
            onChange={(value: string) => setName(value)}
            onSubmit={(value: string) => onSubmit(value, "displayName")}
            isDisabled={!isMyPage}
            isPreviewFocusable={isMyPage}
          >
            <Flex alignItems="center" justifyContent="space-between">
              <EditablePreview pl={2} />
              <EditableInput w="80%" pl={2} />
              <EditableControls isMyPage={isMyPage} />
            </Flex>
          </Editable>
        </Heading>
        <Editable
          textAlign="left"
          fontSize="md"
          mr="50px"
          w="100%"
          placeholder={props.profile || "自己紹介文を書いてください"}
          submitOnBlur={false}
          value={profile}
          onChange={(value: string) => setProfile(value)}
          onSubmit={(value: string) => onSubmit(value, "profile")}
          isDisabled={!isMyPage}
          isPreviewFocusable={isMyPage}
        >
          <Flex alignItems="center" justifyContent="space-between">
            <EditablePreview pl={2} />
            <EditableInput
              as="textarea"
              w="80%"
              h="100%"
              pl={2}
              css={scrollstyle}
            />
            <EditableControls isMyPage={isMyPage} />
          </Flex>
        </Editable>
      </Stack>
      <Link href="/users/7Jw7QMcfHPPWsij67CRq1AWzRrU2">aa</Link>
    </Flex>
  );
};

function EditableControls({ isMyPage }: { isMyPage: boolean }) {
  const { getSubmitButtonProps, getCancelButtonProps, isEditing } =
    useEditableControls();
  return isEditing && isMyPage ? (
    <ButtonGroup justifyContent="center" size="sm">
      <IconButton
        icon={<CheckIcon />}
        aria-label="check"
        _focus={{}}
        {...getSubmitButtonProps()}
      />
      <IconButton
        icon={<CloseIcon />}
        aria-label="close"
        _focus={{}}
        {...getCancelButtonProps()}
      />
    </ButtonGroup>
  ) : (
    <></>
  );
}
export default Profile;
