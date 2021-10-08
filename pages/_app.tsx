import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import React, { useEffect } from "react";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { auth, db } from "../src/lib/firebase";
import { currentUserState } from "../states/currentUser";
import theme from "../theme";
// import "../styles/styles.css";
import nprogress from "nprogress";
import "../styles/nprogress.css";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "@firebase/firestore";
import { currentUserStore } from "../states/currentUserStore";

nprogress.configure({ showSpinner: false, speed: 400, minimum: 0.25 });
function MyApp({ Component, pageProps }: AppProps) {
  if (process.browser) nprogress.start();
  useEffect(() => {
    nprogress.done();
  });
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
