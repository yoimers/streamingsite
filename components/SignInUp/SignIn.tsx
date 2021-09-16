import {
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  HStack,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { FormikHelpers, useFormik } from "formik";
import React, { useState } from "react";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import * as Yup from "yup";
import { auth } from "../../src/lib/firebase";

type InputType<T> = {
  email: T;
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
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("正しいメールアドレスを入力してください")
    .required("メールアドレスを入力してください"),
  password: Yup.string()
    .min(6, "パスワードが短すぎます")
    .max(30, "パスワードが長すぎます")
    .required("パスワードを入力してください"),
});
type Input = {
  onClose: () => void;
};
const SignIn = ({ onClose }: Input) => {
  const [isShow, setIsShow] = useState(false);
  const [isExistUser, setIsExistUser] = useState(true);
  const eyebg = useColorModeValue("brand.mygray1", "h2");
  const onSubmit = (
    values: InputType<string>,
    formikHelpers: FormikHelpers<InputType<string>>
  ) => {
    formikHelpers.setSubmitting(true);
    auth
      .signInWithEmailAndPassword(values.email, values.password)
      .then((userCredential) => {
        userCredential;
        onClose();
        formikHelpers.setSubmitting(false);
      })
      .catch((error) => {
        console.error(error);
        setIsExistUser(false);
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
        width="100%"
        isInvalid={Boolean(
          (formik.errors.email || !isExistUser) && formik.touched.email
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
          {formik.errors.email || (!isExistUser && "ユーザーが存在しません")}
        </FormErrorMessage>
      </FormControl>

      <FormControl
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
        <Button
          variant="mainbutton"
          type="submit"
          isLoading={formik.isSubmitting}
        >
          ログイン
        </Button>
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
