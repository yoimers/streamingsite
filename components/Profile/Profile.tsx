import { Box, Center, Flex, Spacer } from "@chakra-ui/layout";
import {
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  Heading,
  IconButton,
  Input,
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
import { db, storage } from "../../src/lib/firebase";
import Link from "next/link";
import { useRouter } from "next/router";
import useScrollbar from "../../hooks/useScrollbar";
import { getDownloadURL, ref } from "@firebase/storage";
import ImageModal from "./ImageModal";

type Inputdata = {
  isMyPage: boolean;
  [key: string]: any;
};

const Profile = ({ isMyPage, ...props }: Inputdata) => {
  const w = useBreakpointValue({ base: "90%", md: "600px" });
  const bg = useColorModeValue("brand.backgroundcolor2", "gray.900");
  const [profile, setProfile] = useState(props.profile || "");
  const [name, setName] = useState(props.displayName || "");
  const scrollstyle = useScrollbar();
  const router = useRouter();
  useEffect(() => {
    //初期化
    setProfile(props.profile);
    setName(props.displayName);
  }, [props.displayName, props.profile, router.query.uid]);
  const onSubmit = (value: string, type: "displayName" | "profile"): void => {
    if (
      (type === "profile" && props.profile === profile) ||
      (type === "displayName" && props.displayName === name)
    )
      //変更なかったらreturn
      return;
    const userRef = doc(db, `users/${props.uid}`);
    (async () => {
      //存在しない→作成、存在する→上書き
      await setDoc(userRef, { [type]: value }, { merge: true });
      if (type === "displayName") {
        document.title = `Wavelet ${value}`;
      }
    })();
  };

  return (
    <Flex flexDirection="column">
      <Flex px={6} py={5} mt={20} mx="auto" w={w} bg={bg} rounded={10}>
        <ImageModal {...props} />
        <Stack ml={2}>
          <Heading size="sm">
            <Editable
              textAlign="left"
              fontSize="2xl"
              w="100%"
              placeholder={props.displayName || "名前を入力してください"}
              submitOnBlur={false}
              value={name}
              onChange={(value: string) => setName(value.slice(0, 6))}
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
      </Flex>
      <Box mx="auto"></Box>
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
