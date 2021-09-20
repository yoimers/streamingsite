import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import React, { useEffect } from "react";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { auth } from "../src/lib/firebase";
import { currentUserState } from "../states/currentUser";
import theme from "../theme";
// import "../styles//styles.css";
import { onAuthStateChanged, User } from "firebase/auth";

function AppInit() {
  const setCurrentUser = useSetRecoilState(currentUserState);

  useEffect(() => {
    onAuthStateChanged(auth, (user: User | null) => setCurrentUser(user));
  }, [setCurrentUser]);

  return null;
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <AppInit />
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </RecoilRoot>
  );
}
export default MyApp;
