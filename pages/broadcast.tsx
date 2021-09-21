import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { Layout } from "../components/Layout";
import { useRequireLogin } from "../hooks/useRequireLogin";
import { AspectRatio, Box, Center, VStack } from "@chakra-ui/layout";
import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Textarea,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FormikHelpers, useFormik } from "formik";
import { MyLabel } from "../components/SignInUp/SignIn";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../src/lib/firebase";
import { broadcastSchema } from "../validationschema/schema";
import DragandDrop from "../components/Broadcast/DragandDrop";
import { CardType } from "../components/Card/CardType";

type InputType<T> = {
  title: T;
  content: T;
};

const initialValues: InputType<string> = {
  title: "",
  content: "",
};

const Broadcast: NextPage = () => {
  const { isAuthChecking, currentUser } = useRequireLogin();
  const width = useBreakpointValue({ base: "80%", md: "400px" });
  const router = useRouter();

  const onSubmit = (
    values: InputType<string>,
    formikHelpers: FormikHelpers<InputType<string>>
  ) => {
    if (currentUser == null) return;
    formikHelpers.setSubmitting(true);
    (async () => {
      try {
        const add: CardType = {
          title: values.title,
          content: values.content,
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
          createdAt: Timestamp.now(),
          imageUrl:
            "https://firebasestorage.googleapis.com/v0/b/wavelet-f30ce.appspot.com/o/character_ebi_fry.png?alt=media&token=dfc08561-1017-42a9-9a05-a77ddd6ffbc2",
          isNow: true,
        };
        const docRef = await addDoc(collection(db, `broads`), add);
        router.push(`/live/${docRef.id}`);
        formikHelpers.setSubmitting(false);
      } catch (e) {
        console.error("Error adding document: ", e);
        formikHelpers.setSubmitting(false);
      }
    })();
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: broadcastSchema,
  });

  if (isAuthChecking)
    return <Layout title="wavlet 放送設定画面">ログイン情報を確認中…</Layout>;
  if (!currentUser)
    return <Layout title="wavlet 放送設定画面">ログインしていません</Layout>;
  return (
    <Layout title="wavlet 放送設定画面">
      <VStack
        spacing={6}
        rounded={20}
        mt={4}
        as="form"
        w={width}
        mx="auto"
        onSubmit={formik.handleSubmit as any}
      >
        <FormControl
          w="100%"
          isInvalid={Boolean(formik.errors.title && formik.touched.title)}
        >
          <MyLabel label="タイトル" />
          <Input
            name="title"
            type="text"
            variant="inputform"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
          />
          <Box h={1}>
            <FormErrorMessage m={0} p={0}>
              {formik.errors.title}
            </FormErrorMessage>
          </Box>
        </FormControl>
        <FormControl
          w="100%"
          isInvalid={Boolean(formik.errors.content && formik.touched.content)}
        >
          <MyLabel label="内容" />
          <Textarea
            name="content"
            variant="inputform"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.content}
          />
          <Box h={1}>
            <FormErrorMessage m={0} p={0}>
              {formik.errors.content}
            </FormErrorMessage>
          </Box>
        </FormControl>
        <AspectRatio ratio={16 / 9} w="100%" h="100%">
          <></>
        </AspectRatio>
        <DragandDrop />

        <Center mt={10}>
          <Button
            variant="mainbutton"
            type="submit"
            isLoading={formik.isSubmitting}
          >
            放送を作成する
          </Button>
        </Center>
      </VStack>
    </Layout>
  );
};

export default Broadcast;
