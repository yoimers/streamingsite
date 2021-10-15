import { Button } from "@chakra-ui/button";
import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Spinner,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { FormikHelpers, useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { MyLabel } from "../components/SignInUp/SignIn";
import pusher from "../src/lib/clientpusher";
import { questionSchema } from "../validationschema/schema";

type StateType = {
  name: string;
  from: string;
  subject: string;
  text: string;
};
const initialValues: StateType = {
  name: "",
  from: "",
  subject: "",
  text: "",
};

const Question = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const gotoHome = () => {
    router.push("/");
  };
  const onSubmit = async (
    values: StateType,
    formikHelpers: FormikHelpers<StateType>
  ) => {
    formikHelpers.setSubmitting(true);
    try {
      await axios.post("api/email", {
        ...values,
      });
      onOpen();
    } catch (e) {
      alert("エラーが発生しました。もう一度お試しください。");
    } finally {
      formikHelpers.setSubmitting(false);
    }
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: questionSchema,
  });

  return (
    <Layout title="Wavelet お問い合わせ">
      <Flex
        as="form"
        justifyContent="center"
        w="400px"
        mx="auto"
        flexDirection="column"
        onSubmit={formik.handleSubmit as any}
      >
        <Text as="h1" fontSize="2xl" fontWeight="bold" mt={10}>
          お問い合わせ
        </Text>
        <FormControl
          mt={4}
          isInvalid={Boolean(formik.errors.name && formik.touched.name)}
        >
          <MyLabel label="名前" />
          <Input
            placeholder="名前"
            variant="inputform"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          <Box h={1}>
            <FormErrorMessage m={0} p={0}>
              {formik.errors.name}
            </FormErrorMessage>
          </Box>
        </FormControl>

        <FormControl
          mt={4}
          isInvalid={Boolean(formik.errors.from && formik.touched.from)}
        >
          <MyLabel label="メールアドレス" />
          <Input
            placeholder="メールアドレス"
            variant="inputform"
            name="from"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.from}
          />
          <Box h={1}>
            <FormErrorMessage m={0} p={0}>
              {formik.errors.from}
            </FormErrorMessage>
          </Box>
        </FormControl>

        <FormControl
          mt={4}
          isInvalid={Boolean(formik.errors.subject && formik.touched.subject)}
        >
          <MyLabel label="件名" />
          <Input
            placeholder="件名"
            variant="inputform"
            name="subject"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.subject}
          />
          <Box h={1}>
            <FormErrorMessage m={0} p={0}>
              {formik.errors.subject}
            </FormErrorMessage>
          </Box>
        </FormControl>

        <FormControl
          mt={4}
          isInvalid={Boolean(formik.errors.text && formik.touched.text)}
        >
          <MyLabel label="お問い合わせ内容" />
          <Textarea
            placeholder="お問い合わせ内容"
            variant="inputform"
            name="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.text}
            height="200px"
            spellCheck="false"
          />
          <Box h={1}>
            <FormErrorMessage m={0} p={0}>
              {formik.errors.text}
            </FormErrorMessage>
          </Box>
        </FormControl>
        <Button
          variant="mainbutton"
          type="submit"
          w="80px"
          ml="auto"
          mt={4}
          isLoading={formik.isSubmitting}
        >
          送信
        </Button>
      </Flex>

      <Modal
        isOpen={isOpen}
        onClose={gotoHome}
        motionPreset="slideInBottom"
        size="lg"
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>お問い合わせありがとうございました。</ModalHeader>
          <ModalBody
            display="flex"
            justifyContent="center"
            fontSize="lg"
            flexDirection="column"
            textAlign="center"
          >
            折返し、担当者より連絡いたしますので、
            <br />
            恐れ入りますがしばらくお待ちください。
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={gotoHome}
              _focus={{}}
              _active={{}}
            >
              Homeに戻る
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Layout>
  );
};

export default Question;
