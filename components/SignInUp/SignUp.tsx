import {
  Center,
  FormControl,
  FormErrorMessage,
  Input,
  VStack,
} from "@chakra-ui/react";
import { FormikHelpers, useFormik } from "formik";
import React, { useState } from "react";
import { SignUpButton } from "../Header/HeaderButton";
import { inputoption, MyLabel } from "./SignIn";
import * as Yup from "yup";
import { auth } from "../../src/lib/firebase";

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

const validationSchema = Yup.object({
  username: Yup.string()
    .min(2, "名前が短すぎます")
    .max(10, "名前が長すぎます")
    .required("名前を入力してください"),
  email: Yup.string()
    .email("正しいメールアドレスを入力してください")
    .required("メールアドレスを入力してください"),
  password: Yup.string()
    .min(6, "パスワードが短すぎます")
    .max(30, "パスワードが長すぎます")
    .required("パスワードを入力してください"),
  passwordconfirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "パスワードが一致しません")
    .required("パスワードを入力してください"),
});

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
    auth
      .createUserWithEmailAndPassword(values.email, values.password)
      .then((userCredential) => {
        userCredential;
        onClose();
        formikHelpers.setSubmitting(false);
      })
      .catch((error) => {
        console.error(error);
        setIsExistUser(true);
        formikHelpers.setSubmitting(false);
      });
  };

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
        <MyLabel label="なまえ" />
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
        id="email"
        width="100%"
        isInvalid={Boolean(
          (formik.errors.email || isExistUser) && formik.touched.email
        )}
      >
        <MyLabel label="メールアドレス" />
        <Input
          name="email"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          {...inputoption}
        />
        <FormErrorMessage>
          {formik.errors.email ||
            (isExistUser && "このメールアドレスは既に登録されています")}
        </FormErrorMessage>
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
        <SignUpButton type="submit" isLoading={formik.isSubmitting}>
          新規登録
        </SignUpButton>
      </Center>
    </VStack>
  );
};

export default SignUp;
