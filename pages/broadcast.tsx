import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Layout } from "../components/Layout";
import { useRequireLogin } from "../hooks/useRequireLogin";
import {
  AspectRatio,
  Box,
  Center,
  Flex,
  Spacer,
  VStack,
} from "@chakra-ui/layout";
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
import { db, storage } from "../src/lib/firebase";
import { broadcastSchema } from "../validationschema/schema";
import DragandDrop from "../components/Broadcast/DragandDrop";
import { CardType } from "../components/Card/CardType";
import MySpinner from "../components/CommonComponents/MySpinner";
import { UploadImage } from "../src/lib/UploadImage";
import { useRecoilValue } from "recoil";
import { currentUserStore } from "../states/currentUserStore";
import { getDownloadURL, ref } from "firebase/storage";

type InputType<T> = {
  title: T;
  content: T;
};

const initialValues: InputType<string> = {
  title: "",
  content: "",
};

export type ImageStateType = {
  binaryStr: string | ArrayBuffer | null;
  file: any;
};
const Broadcast: NextPage = () => {
  const { isAuthChecking, currentUser } = useRequireLogin();
  const [isUploading, setIsUploading] = useState(false);
  const currentUserstore = useRecoilValue(currentUserStore);
  const width = useBreakpointValue({ base: "80%", md: "400px" });
  const router = useRouter();
  const [imageState, setImageState] = useState<ImageStateType | null>();
  const onSubmit = (
    values: InputType<string>,
    formikHelpers: FormikHelpers<InputType<string>>
  ) => {
    if (currentUser == null) return;
    formikHelpers.setSubmitting(true);
    setIsUploading(true);
    (async () => {
      try {
        //imageの名前
        const time = Date.now().toString();
        const fileName: string = currentUser.uid + time + imageState?.file.name;
        let url: string | undefined = undefined;
        if (imageState) {
          //imageをアップロード
          await UploadImage("broadcastImage", imageState, fileName);
          //imageURLを取得
          url = await getDownloadURL(
            ref(storage, `broadcastImage/${fileName}`)
          );
        } else {
          url = await getDownloadURL(
            ref(storage, `broadcastImage/default.png`)
          );
        }

        //broadcastに追加
        const add: CardType = {
          title: values.title,
          content: values.content,
          uid: currentUser.uid,
          displayName: currentUserstore.displayName,
          photoURL: currentUserstore.photoURL,
          imageUrl: url,
          createdAt: Timestamp.now(),
          imageSource: imageState ? fileName : "default.png",
          isNow: true,
        };
        const docRef = await addDoc(collection(db, `broads`), add);
        router.push(`/live/${docRef.id}`);
        formikHelpers.setSubmitting(false);
      } catch (e) {
        setIsUploading(false);
        alert("エラーが発生しました。もう一度お試しください。");
        formikHelpers.setSubmitting(false);
      }
    })();
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: broadcastSchema,
  });

  if (!currentUser) router.push("/");
  if (currentUser && !isAuthChecking && !isUploading) {
    return (
      <Layout title="wavlet 放送設定画面">
        <Flex
          flexDirection="column"
          rounded={20}
          mt={4}
          as="form"
          w={width}
          mx="auto"
          onSubmit={formik.handleSubmit as any}
        >
          <FormControl
            w="100%"
            mt={6}
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
            mt={6}
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
          <DragandDrop setImageState={setImageState} />

          <Flex mt={10}>
            <Spacer />
            <Button
              variant="mainbutton"
              type="submit"
              isLoading={formik.isSubmitting}
            >
              放送を作成する
            </Button>
          </Flex>
        </Flex>
      </Layout>
    );
  } else return <MySpinner title="wavlet 放送設定画面" />;
};

export default Broadcast;
