import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  Input,
  VStack,
} from "@chakra-ui/react";
import { FormikHelpers, useFormik } from "formik";
import React, { useState } from "react";
import { MyLabel } from "./SignIn";
import * as Yup from "yup";
import { auth } from "../../src/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signupSchema } from "../../validationschema/schema";

type InputType<T> = {
  username: T;
  email: T;
  password: T;
  passwordconfirm: T;
};

const initialValues: InputType<string> = {
  username: "",
  email: "",
  password: "",
  passwordconfirm: "",
};

type Input = {
  onClose: () => void;
};

const SignUp = ({ onClose }: Input) => {
  const [isExistUser, setIsExistUser] = useState(false);

  const onSubmit = (
    values: InputType<string>,
    formikHelpers: FormikHelpers<InputType<string>>
  ) => {
    formikHelpers.setSubmitting(true);
    setIsExistUser(false);
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: signupSchema,
  });

  return (
    <VStack
      spacing={6}
      rounded={20}
      mt={4}
      as="form"
      onSubmit={formik.handleSubmit as any}
    >
      <FormControl
        width="100%"
        isInvalid={Boolean(formik.errors.username && formik.touched.username)}
      >
        <MyLabel label="なまえ" />
        <Input
          name="username"
          type="text"
          variant="inputform"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
        />
        <Box h={1}>
          <FormErrorMessage m={0} p={0}>
            {formik.errors.username}
          </FormErrorMessage>
        </Box>
      </FormControl>

      <FormControl
        width="100%"
        isInvalid={Boolean(
          (formik.errors.email || isExistUser) && formik.touched.email
        )}
      >
        <MyLabel label="メールアドレス" />
        <Input
          name="email"
          type="text"
          variant="inputform"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        <Box h={1}>
          <FormErrorMessage m={0} p={0}>
            {formik.errors.email ||
              (isExistUser && "このメールアドレスは既に登録されています")}
          </FormErrorMessage>
        </Box>
      </FormControl>

      <FormControl
        width="100%"
        isInvalid={Boolean(formik.errors.password && formik.touched.password)}
      >
        <MyLabel label="パスワード" />
        <Input
          type="password"
          name="password"
          variant="inputform"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        <Box h={1}>
          <FormErrorMessage m={0} p={0}>
            {formik.errors.password}
          </FormErrorMessage>
        </Box>
      </FormControl>
      <FormControl
        width="100%"
        isInvalid={Boolean(
          formik.errors.passwordconfirm && formik.touched.passwordconfirm
        )}
      >
        <MyLabel label="パスワードの確認" />
        <Input
          type="password"
          name="passwordconfirm"
          variant="inputform"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.passwordconfirm}
        />
        <Box h={1}>
          <FormErrorMessage m={0} p={0}>
            {formik.errors.passwordconfirm}
          </FormErrorMessage>
        </Box>
      </FormControl>
      <Center mt={10}>
        <Button
          variant="mainbutton"
          type="submit"
          isLoading={formik.isSubmitting}
        >
          新規登録
        </Button>
      </Center>
    </VStack>
  );
};

export default SignUp;
