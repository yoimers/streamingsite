import React, { useEffect, useReducer, useState } from "react";
import {
  Text,
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Spacer,
  useColorModeValue,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { FormikHelpers, useFormik } from "formik";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../src/lib/firebase";
import { currentUserState } from "../../states/currentUser";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/router";
import { currentUserStore } from "../../states/currentUserStore";
import { RepeatIcon } from "@chakra-ui/icons";
import { AiFillHeart } from "react-icons/ai";
import { NumberLocale } from "yup/lib/locale";
import CardTime from "../Card/CardTime";

const maxlength = 100;
const validationSchema = Yup.object({
  comment: Yup.string().max(maxlength).required(),
});

type InputType = {
  comment: string;
};
const CommentForm = ({ createdAt }: { createdAt: number }) => {
  const bg = useColorModeValue("brand.backgroundcolor2", "gray.600");
  const borderright = useColorModeValue("gray.100", "gray.500");
  const currentUser = useRecoilValue(currentUserState);
  const currentUserstore = useRecoilValue(currentUserStore);
  const router = useRouter();

  const onSubmit = (
    values: InputType,
    formikHelpers: FormikHelpers<InputType>
  ) => {
    formikHelpers.setSubmitting(true);
    (async () => {
      try {
        await addDoc(collection(db, `broads/${router.query.live}/comments`), {
          content: values.comment,
          uid: currentUser?.uid || "guest",
          displayName: currentUserstore?.displayName || "guest",
          createdAt: Timestamp.now(),
        });
        formikHelpers.setSubmitting(false);
      } catch (e) {
        console.error("Error adding document: ", e);
        formikHelpers.setSubmitting(false);
      }
    })();
    formikHelpers.resetForm();
  };

  const formik = useFormik({
    initialValues: { comment: "" },
    onSubmit,
    validationSchema,
  });

  return (
    <Box
      h={12}
      px={4}
      bg={bg}
      display="flex"
      alignItems="center"
      roundedBottomLeft={10}
      borderRightWidth={1}
      borderColor={borderright}
    >
      <HStack
        as="form"
        justify="flex-end"
        w="100%"
        spacing={0}
        onSubmit={formik.handleSubmit as any}
      >
        <Flex
          flexDirection="row"
          alignItems="center"
          w="200px"
          h={8}
          rounded={10}
        >
          <CardTime createdAt={createdAt} />
          <Spacer />
          <IconButton
            aria-label="video update"
            // icon={<AiFillHeart size="20px" />}
            mx={2}
            _focus={{}}
          />
        </Flex>
        <InputGroup display="block">
          <Input
            name="comment"
            variant="commentinput"
            value={formik.values.comment}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={Boolean(formik.errors.comment && formik.touched.comment)}
          />
          <InputRightElement h={8} w={10}>
            <Badge colorScheme={formik.errors.comment ? "red" : "gray"}>
              {maxlength - formik.values.comment.length}
            </Badge>
          </InputRightElement>
        </InputGroup>
        <Button
          h={8}
          w={28}
          colorScheme="blue"
          roundedLeft={0}
          _focus={{}}
          _active={{}}
          isLoading={formik.isSubmitting}
          onClick={formik.handleSubmit as any}
        >
          コメント
        </Button>
      </HStack>
    </Box>
  );
};

export default CommentForm;
