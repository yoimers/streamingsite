import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import React, { useEffect } from "react";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { auth, db, storage } from "../src/lib/firebase";
import { currentUserState } from "../states/currentUser";
import theme from "../theme";
// import "../styles//styles.css";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "@firebase/firestore";
import { currentUserStore } from "../states/currentUserStore";
import { getDownloadURL } from "@firebase/storage";
import { ref } from "firebase/storage";

function AppInit() {
  const setCurrentUser = useSetRecoilState(currentUserState);
  const setCurrentUserStore = useSetRecoilState(currentUserStore);

  useEffect(() => {
    onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        (async () => {
          const uidref = doc(db, `users/${user.uid}`);
          const docSnap = await getDoc(uidref);
          if (docSnap.exists()) {
            const data = docSnap.data();
            let url: string = data.photoURL;
            if (data.photoSource) {
              url = await getDownloadURL(
                ref(storage, `profileImage/${data.photoSource}`)
              );
            }
            setCurrentUser(user);
            setCurrentUserStore({ ...data, photoURL: url });
          }
        })();
      } else {
        setCurrentUser(user);
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
