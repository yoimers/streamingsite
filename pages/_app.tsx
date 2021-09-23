import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import React, { useEffect } from "react";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { auth, db } from "../src/lib/firebase";
import { currentUserState } from "../states/currentUser";
import theme from "../theme";
// import "../styles//styles.css";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "@firebase/firestore";
import { currentUserStore } from "../states/currentUserStore";

function AppInit() {
  const setCurrentUser = useSetRecoilState(currentUserState);
  const setCurrentUserStore = useSetRecoilState(currentUserStore);

  useEffect(() => {
    onAuthStateChanged(auth, (user: User | null) => {
      setCurrentUser(user);
      if (user) {
        (async () => {
          const uidref = doc(db, `users/${user.uid}`);
          const docSnap = await getDoc(uidref);
          if (docSnap.exists()) {
            setCurrentUserStore(docSnap.data());
          }
        })();
      }
    });
  }, [setCurrentUser, setCurrentUserStore]);
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
