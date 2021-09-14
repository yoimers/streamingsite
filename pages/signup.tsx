import { Center, FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import { Layout } from "../components/Layout";
import {
  SingInButton,
  SingUpButton,
} from "../components/mycomponents/HeaderButton";
import ToggleInUp from "../components/SignInUp/ToggleInUp";

const Signup = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  return (
    <Layout title="Wavlet SignUp">
      <Center
        rounded={20}
        height="460px"
        width="420px"
        background="brand.subcolor"
      >
        <Stack spacing={12}>
          <ToggleInUp isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
          <FormControl id="username" width="400px" isRequired>
            <FormLabel>名前</FormLabel>
            <Input
              type="username"
              background="white"
              _focus={{
                borderWidth: "2px",
                borderColor: "brand.maincolor",
              }}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>パスワード</FormLabel>
            <Input
              type="password"
              background="white"
              _focus={{
                borderWidth: "2px",
                borderColor: "brand.maincolor",
              }}
            />
          </FormControl>
          <SingUpButton rounded={10}>新規登録</SingUpButton>
        </Stack>
      </Center>
    </Layout>
  );
};

export default Signup;
