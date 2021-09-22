import React from "react";
import {
  Badge,
  Box,
  Button,
  Center,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  useColorModeValue,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { FormikHelpers, useFormik } from "formik";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../src/lib/firebase";
import { currentUserState } from "../../states/currentUser";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/router";

const validationSchema = Yup.object({
  comment: Yup.string().max(100).required(),
});

type InputType = {
  comment: string;
};
const CommentForm = () => {
  const bg = useColorModeValue("brand.backgroundcolor2", "gray.600");
  const borderright = useColorModeValue("gray.100", "gray.500");
  const currentUser = useRecoilValue(currentUserState);
  const router = useRouter();
  const onSubmit = (
    values: InputType,
    formikHelpers: FormikHelpers<InputType>
  ) => {
    formikHelpers.setSubmitting(true);
    (async () => {
      try {
        const docRef = await addDoc(
          collection(db, `broads/${router.query.live}/comments`),
          {
            content: values.comment,
            uid: currentUser?.uid || "guest",
            displayName: currentUser?.displayName || "guest",
            createdAt: Timestamp.now(),
          }
        );
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
        <Center w="200px" bg="gray.800" h={8} rounded={10}>
          何か入れる枠
        </Center>
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
              {formik.values.comment.length}
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
