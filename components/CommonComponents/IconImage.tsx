import React from "react";
import Image from "next/image";
import styles from "../Layout.module.css";
import { FaUserCircle } from "react-icons/fa";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { useRecoilValue } from "recoil";
import { currentUserStore } from "../../states/currentUserStore";

type InputType = {
  photoURL: string | null | undefined;
  size: number;
};
const IconImage = ({ photoURL, size }: InputType) => {
  const profileiconcolor = useColorModeValue("#383838", "#E6EDFF");
  return (
    <>
      {photoURL ? (
        <Image
          src={photoURL}
          layout="fill"
          objectFit="cover"
          alt="Picture of the author"
          className={styles.image}
        />
      ) : (
        <FaUserCircle size={size} color={profileiconcolor} />
      )}
    </>
  );
};

export default IconImage;
