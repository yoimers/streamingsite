import React, { useState } from "react";
import {
  Badge,
  Button,
  Flex,
  HStack,
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
import CardTime from "../Card/CardTime";
import { Heart } from "../Icons/Heart";
import ReLoad from "../Icons/ReLoad";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const onSubmit = (
    values: InputType,
    formikHelpers: FormikHelpers<InputType>
  ) => {
    setIsSubmitting(true);
    (async () => {
      try {
        await addDoc(collection(db, `broads/${router.query.live}/comments`), {
          content: values.comment,
          uid: currentUser?.uid || "guest",
          displayName: currentUserstore?.displayName || "guest",
          createdAt: Timestamp.now(),
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      } finally {
        setTimeout(() => {
          setIsSubmitting(false);
        }, 3000);
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
    <Flex
      h={12}
      px={4}
      bg={bg}
      flexDirection="row"
      alignItems="center"
      roundedBottomLeft={10}
      borderRightWidth={1}
      borderColor={borderright}
    >
      <HStack
        as="form"
        justify="flex-end"
        w="100%"
        spacing={2}
        onSubmit={formik.handleSubmit as any}
      >
        <Flex
          flexDirection="row"
          alignItems="center"
          w="140px"
          h={8}
          rounded={10}
        >
          <CardTime createdAt={createdAt} />
          <Spacer />
        </Flex>
        <InputGroup display="block" w="100%">
          <Input
            name="comment"
            variant="commentinput"
            value={formik.values.comment}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={Boolean(formik.errors.comment && formik.touched.comment)}
            ml={2}
          />
          <InputRightElement h={8} w={10}>
            <Badge colorScheme={formik.errors.comment ? "red" : "gray"}>
              {maxlength - formik.values.comment.length}
            </Badge>
          </InputRightElement>
        </InputGroup>
        <Button
          h={8}
          w={32}
          p={0}
          colorScheme="blue"
          roundedLeft={0}
          _focus={{}}
          _active={{}}
          isLoading={isSubmitting}
          onClick={formik.handleSubmit as any}
        >
          コメント
        </Button>
      </HStack>
    </Flex>
  );
};

export default CommentForm;
