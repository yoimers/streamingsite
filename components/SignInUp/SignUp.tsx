import {
  Center,
  FormControl,
  FormErrorMessage,
  Input,
  VStack,
} from "@chakra-ui/react";
import { FormikHelpers, useFormik } from "formik";
import React from "react";
import { SingUpButton } from "../Header/HeaderButton";
import { inputoption, MyLabel } from "./SignIn";
import * as Yup from "yup";

type InputType<T> = {
  username: T;
  password: T;
  passwordconfirm: T;
};
const validate = (values: InputType<string>) => {
  const errors: InputType<string> = {
    username: "",
    password: "",
    passwordconfirm: "",
  };
  if (!values.username) {
    errors.username = "名前を入力してください";
  } else if (values.username.length > 10) {
    errors.username = "名前が長すぎます";
  } else if (values.username.length < 3) {
    errors.username = "名前が短すぎます";
  }
  if (!values.password) {
    errors.password = "パスワードを入力してください";
  } else if (values.password.length > 20) {
    errors.password = "パスワードが長すぎます";
  } else if (values.password.length < 4) {
    errors.password = "パスワードが短すぎます";
  }
  if (values.password !== values.passwordconfirm) {
    errors.passwordconfirm = "パスワードが一致しません";
  }
  return errors;
};

const initialValues: InputType<string> = {
  username: "",
  password: "",
  passwordconfirm: "",
};

const onSubmit = (
  values: InputType<string>,
  formikHelpers: FormikHelpers<InputType<string>>
) => {
  formikHelpers.setSubmitting(true);
  setTimeout(() => {
    formikHelpers.setSubmitting(false);
    alert(JSON.stringify(values, null, 2));
  }, 1000);
};

const validationSchema = Yup.object({
  username: Yup.string()
    .min(2, "名前が短すぎます")
    .max(10, "名前が長すぎます")
    .required("名前を入力してください"),
  password: Yup.string()
    .min(2, "パスワードが短すぎます")
    .max(10, "パスワードが長すぎます")
    .required("パスワードを入力してください"),
  passwordconfirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "パスワードが一致しません")
    .required("パスワードを入力してください"),
});

const SignUp = () => {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
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
        id="username"
        width="100%"
        isInvalid={Boolean(formik.errors.username && formik.touched.username)}
      >
        <MyLabel label="名前" />
        <Input
          name="username"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          {...inputoption}
        />
        <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
      </FormControl>
      <FormControl
        id="password"
        width="100%"
        isInvalid={Boolean(formik.errors.password && formik.touched.password)}
      >
        <MyLabel label="パスワード" />
        <Input
          type="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          {...inputoption}
        />
        <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
      </FormControl>
      <FormControl
        id="passwordconfirm"
        width="100%"
        isInvalid={Boolean(
          formik.errors.passwordconfirm && formik.touched.passwordconfirm
        )}
      >
        <MyLabel label="パスワードの確認" />
        <Input
          type="password"
          name="passwordconfirm"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.passwordconfirm}
          {...inputoption}
        />
        <FormErrorMessage>{formik.errors.passwordconfirm}</FormErrorMessage>
      </FormControl>
      <Center mt={10}>
        <SingUpButton type="submit" isLoading={formik.isSubmitting}>
          新規登録
        </SingUpButton>
      </Center>
    </VStack>
  );
};

export default SignUp;
