import { Spacer, Box } from "@chakra-ui/layout";
import React from "react";
import { Heart } from "../components/Icons/Heart";
import ReLoad from "../components/Icons/ReLoad";
import SpreadHearts from "../components/Icons/SpreadHearts";
import CommonVideo from "../components/Live/Video/CommonVideo";

const Test = () => {
  return (
    <>
      <SpreadHearts />
      <Heart />
      <Box mx={1} />
      <ReLoad />
    </>
  );
};

export default Test;
