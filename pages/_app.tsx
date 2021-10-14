import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import React, { useEffect } from "react";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { auth, db } from "../src/lib/firebase";
import { currentUserState } from "../states/currentUser";
import theme from "../theme";
// import "../styles/styles.css";
import "../styles/nprogress.css";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "@firebase/firestore";
import { currentUserStore } from "../states/currentUserStore";
import NextNprogress from "nextjs-progressbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <AppInit />
      <NextNprogress
        color="#6ba2f5"
        startPosition={0.3}
        stopDelayMs={200}
        height={2}
        showOnShallow={true}
      />
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </RecoilRoot>
  );
}
export default MyApp;

function AppInit() {
  const setCurrentUser = useSetRecoilState(currentUserState);
  const setCurrentUserStore = useSetRecoilState(currentUserStore);

  useEffect(() => {
    //認証状態が変更時に実行される
    onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        (async () => {
          //userRef作成
          try {
            const uidref = doc(db, `users/${user.uid}`);
            const docSnap = await getDoc(uidref);
            if (docSnap.exists()) {
              const data = docSnap.data();
              setCurrentUser(user);
              setCurrentUserStore({ ...data });
            }
          } catch (e) {
            setCurrentUser(null);
          }
        })();
      } else {
        setCurrentUser(null);
      }
    });
  }, [setCurrentUser, setCurrentUserStore]);
  return null;
}
