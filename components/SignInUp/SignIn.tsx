import {
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  HStack,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { FormikHelpers, useFormik } from "formik";
import React, { useState } from "react";
import { SingUpButton } from "../Header/HeaderButton";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import * as Yup from "yup";

type InputType<T> = {
  username: T;
  password: T;
};

export const inputoption = {
  background: "brand.backgroundcolor2",
  _invalid: {
    borderWidth: "2px",
    borderColor: "red.300",
  },
  _focus: {
    borderWidth: "2px",
    borderColor: "brand.maincolor",
  },
};
const initialValues: InputType<string> = {
  username: "",
  password: "",
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
});

const SignIn = () => {
  const [isShow, setIsShow] = useState(false);
  const eyebg = useColorModeValue("brand.mygray1", "h2");
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
        <InputGroup>
          <Input
            type={isShow ? "text" : "password"}
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            {...inputoption}
          />
          <InputRightElement width="4rem">
            <Button
              h="1.5rem"
              size="xs"
              onClick={() => setIsShow(!isShow)}
              _focus={{}}
              _active={{}}
              color={eyebg}
            >
              {isShow ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
      </FormControl>

      <Center mt={10}>
        <SingUpButton type="submit" isLoading={formik.isSubmitting}>
          ログイン
        </SingUpButton>
      </Center>
    </VStack>
  );
};

export const MyLabel = ({ label }: { label: string }) => {
  return (
    <HStack flexDirection="row">
      <Text>{label}</Text>
      <Text color="red.300">*</Text>
    </HStack>
  );
};

export default SignIn;
