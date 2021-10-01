import { doc } from "@firebase/firestore";
import { getDownloadURL, ref } from "@firebase/storage";
import { getDoc } from "firebase/firestore";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import MySpinner from "../../components/CommonComponents/MySpinner";
import NotLogin from "../../components/CommonComponents/NotLogin";
import { Layout } from "../../components/Layout";
import MyPage from "../../components/Profile/MyPage";
import { useIsMyPage } from "../../hooks/useIsMyPage";
import { db, storage } from "../../src/lib/firebase";

export const UserPage: NextPage = (props: any) => {
  const { isMyPage, isAuthChecking, currentUser } = useIsMyPage();
  const router = useRouter();
  if (Object.keys(props).length === 0) router.push("/404");
  if (isAuthChecking) return <MySpinner />;
  if (!currentUser) return <NotLogin />;
  return (
    <Layout title={`Wavelet ${props.displayName}`}>
      <MyPage isMyPage={isMyPage} {...props} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  if (!params) return { props: {} };

  const uidref = doc(db, `users/${params.uid}`);
  const docSnap = await getDoc(uidref);
  const data = docSnap.data();
  if (docSnap.exists() && data) {
    let url: string = data.photoURL;
    if (data.photoSource) {
      url = await getDownloadURL(
        ref(storage, `profileImage/${data.photoSource}`)
      );
    }
    return {
      props: {
        uid: params.uid,
        ...data,
        photoURL: url,
        createdAt: data.creationTime,
        lastSignInTime: data.lastSignInTime,
      },
    };
  } else {
    return { props: {} };
  }
};

export default UserPage;
