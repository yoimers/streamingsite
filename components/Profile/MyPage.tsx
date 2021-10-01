import React from "react";
import Profile from "./Profile";

type Input = {
  isMyPage: boolean;
  [key: string]: any;
};

const MyPage = ({ isMyPage, ...props }: Input) => {
  return <Profile isMyPage={isMyPage} {...props} />;
};
export default MyPage;
