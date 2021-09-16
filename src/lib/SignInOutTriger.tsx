import React from "react";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../../states/currentUser";

type Input = {
  SignIn: JSX.Element;
  SignOut: JSX.Element;
  Loading: JSX.Element;
};
export const SignInOutTriger = ({
  SignIn,
  SignOut,
  Loading,
}: Input): JSX.Element => {
  const currentUser = useRecoilValue(currentUserState);
  switch (currentUser) {
    case undefined:
      //Loading
      return Loading;
    case null:
      //SignOut
      return SignOut;
    default:
      //SignIn
      return SignIn;
  }
};
